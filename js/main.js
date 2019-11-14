const WIDTH = 1024;
const HEIGHT = 768;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.setAttribute("class", "border");
canvas.width = WIDTH;
canvas.height = HEIGHT;

let startButtonHeight = 300;
let startButtonWidth = 80;
let startX = 360;
let startY = 270;

ctx.beginPath();
ctx.strokeStyle = 'brown';
ctx.lineWidth = '5';
ctx.rect(0,0,1024,768);
ctx.stroke();


createButton = function(img, x, y, dheight, dwidth){
ctx.drawImage(img, x, y, dheight, dwidth);
ctx.stroke();
};

let img = document.getElementById('startGame')
let startButton = new createButton( img, startX, startY, startButtonHeight, startButtonWidth);
startButton.id = "startButtons";

canvas.addEventListener("click", onCanvasClick, false);

function onCanvasClick(e){
   alert(onClickEvent(e));
};

function onClickEvent(e){
   var rect = canvas.getBoundingClientRect();
   var x = e.clientX - rect.left;
   var y = e.clientY - rect.top;
   var endx = startX + startButtonHeight;
   var endy = startY + startButtonWidth;
   if((x>=startX && y>=startY) && (x<=endx && y<=endy)){
         return[x,y];
      }
};

let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);