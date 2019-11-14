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

canvas.addEventListener('click', function() { }, false);

createButton = function(img, x, y, dheight, dwidth){
ctx.drawImage(img, x, y, dheight, dwidth);
ctx.stroke();
};

let img = document.getElementById('startGame')
let startButton = new createButton( img, startX, startY, startButtonHeight, startButtonWidth);

var e = document.getElementById('myCanvas'),
   elemLeft = e.offsetLeft,
   elemTop = e.offsetTop,
   elements = [];

e.addEventListener('click', function(event) {
   var xVal = event.pageX - elemLeft,
   yVal = event.pageY - elemTop;
   console.log(xVal, yVal);
   elements.forEach(function(ele) {
      if (yVal > ele.top && yVal < ele.top + ele.height && xVal > ele.left && xVal < ele.left + ele.width) {
         alert('element clicked');
      }
   });
}, false);
elements.push({
   colour: '#1C2128',
   width: 250,
   height: 200,
   top: 30,
   left: 20
});
elements.forEach(function(ele) {
   ctx.fillStyle = element.colour;
   ctx.fillRect(ele.left, ele.top, ele.width, ele.height);
});

let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);