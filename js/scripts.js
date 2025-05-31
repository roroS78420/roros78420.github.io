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
function random(min, max){
  return Math.floor((Math.random() * (max - min)) + min);
}

function reset(){
  $('.card').remove();
  for (var i = 0; i < 210; i++){
    var rand = Math.random() * 100;
    let rarity, color, imgTag;

    if (rand < 10) {
      rarity = "yellow";
      color = "yellow";
    } else if (rand < 25) {
      rarity = "red";
      color = "red";
    } else if (rand < 45) {
      rarity = "pink";
      color = "hotpink";
    } else if (rand < 70) {
      rarity = "purple";
      color = "purple";
    } else {
      rarity = "blue";
      color = "lightblue";
    }

    // extract the image URL from the img[rarity] string
    const imgTagMatch = img[rarity].match(/src="([^"]+)"/);
    const imgSrc = imgTagMatch ? imgTagMatch[1] : '';

    const element = `
      <div class="card" 
           style="background-color: ${color};" 
           data-rarity="${rarity}" 
           data-img="${imgSrc}" 
           id="itemNumber${i}">
      </div>`;
    $('#cardList').append(element);
  }

  $('.card').first().css('margin-left', -1000);
}


function openCase() {
  reset();

  var rand = random(1000, 20000);
  var childNumber = Math.floor(rand / 100) + 4;
  var timings = ["easeInOutBack", "easeOutExpo", "easeInOutBounce", "easeOutQuad", "swing", "easeOutElastic", "easeInOutElastic"];
  var timing = timings[random(0, timings.length)];
  var reward = $('#itemNumber' + childNumber).attr('data-rarity');

  $('.card').first().animate({
    marginLeft: -rand
  }, 5000, timing, function () {
    var src = $('#itemNumber' + childNumber).attr('data-img');

    $('#itemNumber' + childNumber).css({
      background: "linear-gradient(#00bf09, #246b27)"
    });

    $('#dialog-msg').html(`
      <strong>${adrienDescription[reward]}</strong><br>
      <img src="${src}" alt="Carte ${reward}">
    `);

// Fenêtre de loot avec bouton "Fermer"
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
      backgroundColor: '#1D3B60',
      color: '#fff',
      border: '4px solid #0C7B93',     // Bordure visible
      borderRadius: '12px',            // Coins arrondis
      boxShadow: '0 0 20px #0C7B93'    // Effet glow doux
    });

    $parent.find('.ui-dialog-titlebar-close').hide();

    $parent.find('.ui-dialog-buttonpane button').addClass('btn-fermer');
  }
});

    $('#dialog-msg img').css('cursor', 'zoom-in').on('click', function () {
      $('#modalImage').attr('src', $(this).attr('src'));
$('#imageModal').dialog({
  modal: true,
  resizable: false,
  draggable: false,
  closeOnEscape: false,
  width: Math.min($(window).width() * 0.9, 600), // 90% largeur écran ou max 600px
  open: function () {
    $(this).parent().find('.ui-dialog-titlebar-close').hide();
    $(this).parent().find('.ui-dialog-buttonpane button').addClass('btn-fermer');

    // On adapte aussi la hauteur max de l'image
    $('#modalImage').css({
      width: '100%',
      height: 'auto',
      'max-height': '80vh', // Ne dépasse pas 80% de la hauteur de l'écran
      display: 'block',
      margin: '0 auto'
    });
  },
  buttons: {
    "Fermer": function () {
      $(this).dialog("close");
    }
  }
});




const adrienDescription = {
  blue: "Adrien HTML – Il aligne tout avec des &lt;br&gt;",
  purple: "Adrien CSS – Son dieu s'appelle <code>!important</code>",
  pink: "Adrien JS – <code>console.log('il sait coder')</code>",
  red: "Adrien Full Stack – Il code le front, le back et fait le café",
  yellow: "Adrien DevOps – Il parle en Docker et déploie le vendredi à 18h"
};

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
          countUp("projects", 15);
          countUp("certs", 2);

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

  const section2 = document.getElementById("connexion");
  if (section2) {
    observerUnbox.observe(section2);
  }
});
document.addEventListener("DOMContentLoaded", function () {
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


  // Observer pour mettre à jour la classe active
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
