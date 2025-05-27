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


function openCase(){
  reset();
  var rand = random(1000,20000);
  var childNumber = Math.floor(rand/100)+4;
  var timings = ["easeInOutBack","easeOutExpo","easeInOutBounce","easeOutQuad","swing","easeOutElastic","easeInOutElastic"];
  var timing = timings[random(0,timings.length)];
  var reward = $('#itemNumber'+childNumber).attr('data-rarity');

  $('.card').first().animate({
    marginLeft: -rand
  }, 5000, timing, function(){
    var src = $('#itemNumber' + childNumber).attr('data-img'); // ✅ ICI

    $('#itemNumber'+childNumber).css({background: "linear-gradient(#00bf09, #246b27)"});

    $('#dialog-msg').html(`
      <strong>${adrienDescription[reward]}</strong><br>
      <img src="${src}" alt="Carte ${reward}">
    `);

    $('#dialog').dialog({
      modal: true,
      title: "New item!",
      resizable: false,
      draggable: false,
      width: 400,
      buttons: {
        "Receive item": function () {
          $(this).dialog("close");
        }
      },
      open: function () {
        $(this).parent().css({
          backgroundColor: '#07bdff',
          color: '#000'
        });
      }
    });

    // Pour agrandir au clic (étape 3, si tu veux)
    $('#dialog-msg img').css('cursor', 'zoom-in').on('click', function () {
      $('#modalImage').attr('src', $(this).attr('src'));
      $('#imageModal').dialog({
        modal: true,
        title: "Zoom sur l'image",
        width: 600,
        resizable: false,
        draggable: false,
        buttons: {
          "Fermer": function () {
            $(this).dialog("close");
          }
        }
      });
    });

  });
}


const adrienDescription = {
  blue: "Adrien HTML – Il aligne tout avec des &lt;br&gt;",
  purple: "Adrien CSS – Son dieu s'appelle <code>!important</code>",
  pink: "Adrien JS – <code>console.log('il sait coder')</code>",
  red: "Adrien Full Stack – Il code le front, le back et fait le café",
  yellow: "Adrien DevOps – Il parle en Docker et déploie le vendredi à 18h"
};

/* SLIDE DELAY */ 
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
      threshold: 0.5, // au moins 50% visible
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
  const duration = 1000; // Durée totale (ms)
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

          // Lance les compteurs seulement à ce moment
          countUp("xp-years", 3);
          countUp("projects", 15);
          countUp("certs", 2);

          observer.unobserve(entry.target); // Stop l'observation après animation
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
