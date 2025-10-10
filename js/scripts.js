function countUp(id, max, duration = 1000) {
  const el = document.getElementById(id);
  let current = 0;
  const increment = Math.ceil(max / (duration / 50));
  
  const interval = setInterval(() => {
    current += increment;
    if (current >= max) {
      current = max;
      clearInterval(interval);
    }
    el.textContent = current;
  }, 50);
}


// fonction cs
var img = {
  blue: '<img src="https://i.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg">',
  purple: '<img src="https://i.kym-cdn.com/entries/icons/original/000/018/012/this_is_fine.jpeg">',
  pink: '<img src="https://media.makeameme.org/created/it-works-i-d9d836abc6.jpg">',
  red: '<img src="https://media.makeameme.org/created/its-not-a-b58ceb98f4.jpg">',
  yellow: '<img src="https://miro.medium.com/v2/resize:fit:600/0*TzEwS_4n0YzHy1jQ.jpg">' // À remplacer
};
const adrienDescription = {
  blue: "Adrien HTML – Il aligne tout avec des &lt;br&gt;",
  purple: "Adrien CSS – Son dieu s'appelle <code>!important</code>",
  pink: "Adrien JS – <code>console.log('il sait coder')</code>",
  red: "Adrien Full Stack – Il code le front, le back et fait le café",
  yellow: "Adrien DevOps – Il parle en Docker et déploie le vendredi à 18h"
};
function random(min, max){
  return Math.floor((Math.random() * (max - min)) + min);
}
// Fonction reset() CORRIGÉE avec des couleurs modernes
function reset() {
    $('#cardList').empty(); // .remove() peut poser problème, .empty() est plus sûr
    
    // On définit une palette de couleurs qui correspond au nouveau design
    const rarityColors = {
        yellow: '#f0db4f', // Jaune/Or pour la rareté max
        red: '#e44d26',     // Orange/Rouge
        pink: '#787cb5',    // Violet (anciennement rose)
        purple: '#264de4',  // Bleu
        blue: '#00A3FF'     // Bleu clair (notre couleur d'accent)
    };

    for (var i = 0; i < 210; i++) {
        var rand = Math.random() * 100;
        let rarity;

        if (rand < 20) { rarity = "yellow"; } // Plus rare
        else if (rand < 40) { rarity = "red"; }
        else if (rand < 60) { rarity = "pink"; }
        else if (rand < 80) { rarity = "purple"; }
        else { rarity = "blue"; }

        const color = rarityColors[rarity]; // On utilise notre nouvelle palette
        const imgSrc = img[rarity].match(/src="([^"]+)"/)[1];

        const element = `
            <div class="card" 
                 style="background-color: ${color};" 
                 data-rarity="${rarity}" 
                 data-img="${imgSrc}" 
                 id="itemNumber${i}">
                 <img src="${imgSrc}" alt=""> 
            </div>`;
        $('#cardList').append(element);
    }

    $('.card').first().css('margin-left', -1000);
}


function openCase() {
    reset();

    var rand = random(1000, 20000);
    var timings = ["easeInOutBack", "easeOutExpo", "easeInOutBounce", "easeOutQuad", "swing", "easeOutElastic", "easeInOutElastic"];
    var timing = timings[random(0, timings.length)];

    $('.card').first().animate({
        marginLeft: -rand
    }, 5000, timing, function () {
        // --- DÉBUT DE LA NOUVELLE LOGIQUE FIABLE ---

        // 1. On trouve le centre de la zone de la roulette
        const container = $('#cardList');
        const containerCenter = container.offset().left + (container.width() / 2);

        let winningCard = null;
        let minDistance = Infinity;

        // 2. On parcourt toutes les cartes pour trouver celle qui est la plus proche du centre
        $('.card').each(function() {
            const card = $(this);
            const cardCenter = card.offset().left + (card.width() / 2);
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                winningCard = card; // On a trouvé la carte la plus proche !
            }
        });

        // 3. On utilise la VRAIE carte gagnante pour afficher le résultat
        if (winningCard) {
            const reward = winningCard.attr('data-rarity');
            const src = winningCard.attr('data-img');

            // On applique le style à la carte gagnante
            winningCard.css({
                background: "var(--accent-color)",
                boxShadow: "0 0 20px var(--accent-color)",
                transform: "scale(1.05)" // On la fait ressortir un peu
            });

            // On affiche les bonnes informations dans la pop-up
            $('#dialog-msg').html(`
                <strong>${adrienDescription[reward]}</strong><br>
                <img src="${src}" alt="Carte ${reward}">
            `);

            // Le reste de ton code pour la pop-up est bon
            $('#dialog').dialog({
                modal: true,
                title: "Profil obtenu :",
                resizable: false,
                draggable: false,
                width: 400,
                buttons: {
                    "Fermer": function () {
                        $(this).dialog("close");
                    }
                },
                open: function () {
                    const $parent = $(this).parent();
                    $parent.css({
                        backgroundColor: '#1e1e1e',
                        color: 'var(--text-primary)',
                        border: '2px solid var(--accent-color)',
                        borderRadius: '8px',
                        boxShadow: '0 0 25px rgba(0, 163, 255, 0.5)'
                    });
                    $parent.find('.ui-dialog-titlebar').css({
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#fff',
                        'font-weight': 'bold'
                    });
                    $parent.find('.ui-dialog-titlebar-close').hide();
                    $parent.find('.ui-dialog-buttonpane button').addClass('btn-fermer');
                }
            });
        }
        // --- FIN DE LA NOUVELLE LOGIQUE ---
    });
}


    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function checkAndAnimateBars() {
        const bars = document.querySelectorAll('.bar-container > div');
        bars.forEach((bar) => {
            if (isInViewport(bar) && !bar.classList.contains('animate-slide')) {
                bar.classList.add('animate-slide');
            }
        });
    }


    document.addEventListener("DOMContentLoaded", function () {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const bars = entry.target.querySelectorAll(".bar-container > div");
                        bars.forEach((bar) => {
                            bar.classList.add("animate-slide");
                        });

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );

        const target = document.getElementById("competences");
        if (target) {
            observer.observe(target);
        }
    });

    function countUp(id, endValue) {
        const el = document.getElementById(id);
        let start = 0;
        const duration = 1000;
        const stepTime = 20;
        const increment = endValue / (duration / stepTime);

        const counter = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                el.textContent = endValue;
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(start);
            }
        }, stepTime);
    }

    document.addEventListener("DOMContentLoaded", function () {
        let hasAnimatedStats = false;

        const observerStats = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimatedStats) {
                        hasAnimatedStats = true;

                        countUp("xp-years", 3);
                        countUp("projects", 14);
                        countUp("certs", 3);

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        const statsSection = document.getElementById("stats");
        if (statsSection) {
            observerStats.observe(statsSection);
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        const header = document.querySelector("header");
        const sections = document.querySelectorAll("section.slide");

        const observer = new IntersectionObserver(
            (entries) => {
                let isFirstVisible = false;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id === "accueil") {
                        isFirstVisible = true;
                    }
                });

                if (isFirstVisible) {
                    header.classList.remove("affix");
                } else {
                    header.classList.add("affix");
                }
            },
            {
                threshold: 0.5,
            }
        );

        sections.forEach((section) => observer.observe(section));
    });

    document.addEventListener("DOMContentLoaded", function () {
        const header = document.getElementById("main-header");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("affix");
            } else {
                header.classList.remove("affix");
            }
        });
    });
    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('navbar');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('show');
        });

        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 10) {
                header.classList.add('affix');
            } else {
                header.classList.remove('affix');
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const unboxWrapper = document.getElementById("unbox-wrapper");

        // Si on est sur mobile (par exemple largeur ≤ 768px), afficher directement sans animation
        if (window.innerWidth <= 768) {
            unboxWrapper.classList.remove("invisible");
            unboxWrapper.classList.add("visible");
            return; // on sort, pas d'observer
        }

        // Desktop : animation avec IntersectionObserver
        let hasAnimatedUnbox = false;

        const observerUnbox = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedUnbox) {
                    hasAnimatedUnbox = true;

                    unboxWrapper.classList.remove("invisible");
                    unboxWrapper.classList.add("visible", "animate__animated", "animate__bounceInUp");

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observerUnbox.observe(unboxWrapper);

        // Si tu veux observer une autre section :
        const section2 = document.getElementById("connexion");
        if (section2) {
            observerUnbox.observe(section2);
        }

        // -------- Navigation JS --------
        const navLinks = document.querySelectorAll(".js--navigate-link");
        const sections = Array.from(navLinks).map(link => {
            const id = link.getAttribute("href").substring(1);
            return document.getElementById(id);
        }).filter(Boolean);

        navLinks.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(link => {
                            if (link.getAttribute("href").substring(1) === id) {
                                link.classList.add("is--active");
                            } else {
                                link.classList.remove("is--active");
                            }
                        });
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        sections.forEach(section => observer.observe(section));
    });
