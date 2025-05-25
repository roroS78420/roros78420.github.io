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
  blue: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-5mpSEguXLPr7Vn35c18lwmO7Eu9TwjVbs8xVqZm_3J4TGcVU3YFCE-Ae5weq81JXovJXLyiRjvyFw4nfD30vgN-NX6nY/360fx360f"/>',
  purple: '<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH7du6kb-FlvD1DLfYkWNF18lwmO7Eu46h2QS1r0tvZjvyLI-RIwI6aV7X_ADrwevmhZO0up_AwSM1uHNw5nzD30vgQ0tV-jw/360fx360f"/>',
  pink: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-oLKhF2zowcDPzixc9OLcw82ZlyF8wC8wb251MW4tcifmydi7CEn4HiPlhyy1BxJbeNshqPIHELeWfJvK5CfiA/360fx360f"/>',
  red: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWZU7Mxkh9bN9J7yjRrhrUFuazjzJteVJlQ6NVHTrFe3wObs15G06picwHFnvid25C3bnhSzn1gSOQz0szG-/360fx360f"/>',
  yellow: '<img src="http://vignette4.wikia.nocookie.net/cswikia/images/a/ad/Csgo-default_rare_item.png/revision/latest?cb=20150227163025"/>'
}
function random(min, max){
  return Math.floor((Math.random() * (max - min)) + min);
}

function reset(){
  $('.card').remove();
  for (var i = 0; i < 210; i++){
    var element = '<div class="card" style="background-color: lightblue;" data-rarity="blue" id=itemNumber'+i+'>'+img.blue+'</div>';
    var rand = random(1,10000)/100;
    if (rand < 20){
      element = '<div class="card" style="background-color: purple;" data-rarity="purple" id=itemNumber'+i+'>'+img.purple+'</div>';
    }
    if (rand < 5){
      element = '<div class="card" style="background-color: hotpink;" data-rarity="pink" id=itemNumber'+i+'>'+img.pink+'</div>';
    }
    if (rand < 2){
      element = '<div class="card" style="background-color: red;" data-rarity="red" id=itemNumber'+i+'>'+img.red+'</div>';
    }
    if (rand < 0.5){
      element = '<div class="card" style="background-color: yellow;" data-rarity="yellow" id=itemNumber'+i+'>'+img.yellow+'</div>';
    }
    $('#cardList').append(element);
  }
  $('.card').first().css('margin-left',-1000);
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
    var src = $('#itemNumber'+childNumber+' img').attr('src');
    $('#itemNumber'+childNumber).css({background: "linear-gradient(#00bf09, #246b27)"});

    $('#dialog-msg').html("You have received "+reward+" item!"+"<br><img src="+src+">");

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
  });
}
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