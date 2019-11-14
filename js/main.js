const WIDTH = 1024;
const HEIGHT = 768;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.setAttribute("class", "border");
canvas.width = WIDTH;
canvas.height = HEIGHT;

let startButtonWidth = 300;
let startButtonHeight = 80;
let startButtonX = 360;
let startButtonY = 270;

ctx.beginPath();
ctx.strokeStyle = 'brown';
ctx.lineWidth = '5';
ctx.rect(0,0,1024,768);
ctx.stroke();

createButton = function(img, x, y, dheight, dwidth){
ctx.drawImage(img, x, y, dheight, dwidth);
};

let img = document.getElementById('startGame')
let startButton = new createButton( img, startButtonX, startButtonY, startButtonWidth, startButtonHeight);

canvas.addEventListener("click", onStartClickEvent, false);

function onStartClickEvent(e){
   var rect = canvas.getBoundingClientRect();
   var x = e.clientX - rect.left;
   var y = e.clientY - rect.top;
   var endX = startButtonX + startButtonWidth;
   var endY = startButtonY + startButtonHeight;
   if((x>=startButtonX && y>=startButtonY) && (x<=endX && y<=endY)){
      alert(x + ' ' + y);
   }
};

let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);