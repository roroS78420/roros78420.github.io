let animationFrameId; // pour pouvoir l'annuler plus tard

'use strict';

var canvas = document.querySelector('canvas');
const dpr = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

var c = canvas.getContext('2d');
c.scale(dpr, dpr);



function animate(){
  animationFrameId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  const dpr = window.devicePixelRatio || 1;
  const text = "Bienvenue sur mon site";
  const maxWidth = window.innerWidth * 0.9;
  let fontSize = 60;

  c.font = `bold ${fontSize}px Arial`;
  while (c.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize--;
    c.font = `bold ${fontSize}px Arial`;
  }

  c.fillStyle = "white";
  c.textAlign = "center";
  c.textBaseline = "middle";

  // ✅ Centrage correct même sur mobile
c.fillText(text, canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}





'use strict';

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 50;
var minRadius = 4;

var colorArray = [
  "#2C3E50",
  "#E74C3C",
  "#ECF0F1",
  "#3498DB",
  "#2980B9"
];
function mouseMoveHandler(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
}
window.addEventListener('mousemove', mouseMoveHandler);


window.addEventListener('resize', function() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  c.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
  c.scale(dpr, dpr); // Appliquer le scale
  init();
});



//Arc || Circle
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = "green";
      c.stroke();
      c.fillStyle = this.color;
      c.fill();
    }
    this.update = function(){
      if(this.x + this.radius > canvas.width ||
        this.x - this.radius < 0){
        this.dx = -this.dx;
      }
      if(this.y + this.radius > canvas.height ||
        this.y - this.radius < 0){
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //Interaction
      if(mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50){
        if(this.radius < maxRadius) {
          this.radius += 1;
        }
      }
      else if(this.radius > minRadius){
        this.radius -= 1;
      }
      this.draw()
    }
}

//All particles
var circleArray = [];

function init (){

  circleArray = [];
  for (var i = 0; i < 800; i++) {
    //Randomize circle
    var x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
    var y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
    var dx = (Math.random() -0.5);
    var dy = (Math.random() -0.5);
    var radius = (Math.random() * 4) + 1;
    console.log(x);
    console.log(y);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};



init();
animate();

setTimeout(() => {
  const canvas = document.getElementById('myCanvas');
  canvas.classList.add('hide');
}, 2000);


function stopCanvas() {
  cancelAnimationFrame(animationFrameId); // stoppe l’animation
  window.removeEventListener('mousemove', mouseMoveHandler);
  canvas.classList.add('hide'); // déjà fait chez toi
}

setTimeout(stopCanvas, 2000);
