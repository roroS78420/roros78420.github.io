let animationFrameId; // pour pouvoir l'annuler plus tard

function animate(){
  animationFrameId = requestAnimationFrame(animate); // stocke l'ID
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.font = "bold 60px Arial";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText("Bienvenue sur mon site", canvas.width / 2, canvas.height / 2);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}


'use strict';

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

console.log(canvas);

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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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


//Animate
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
c.font = "bold 60px Arial";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("Bienvenue sur mon site", canvas.width / 2, canvas.height / 2);


  //Drawing all particles
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
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
