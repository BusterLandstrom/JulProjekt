const WIDTH = 1024;
const HEIGHT = 768;

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.setAttribute("class", "border");
canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.beginPath();
ctx.strokeStyle = 'brown';
ctx.lineWidth = '5';
ctx.rect(0,0,1024,768);
ctx.stroke();

buttonGame = function(ctx, color, lwidth, lheight, x,y){
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = '1';
ctx.rect(x,y,lwidth,lheight);
ctx.stroke();
this.clicked=function(){
    ctx.fillStyle='#ff0000'
    ctx.fill();
  }
}

let startButton = new buttonGame(ctx, 'brown', 250, 40, 380, 280);

let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);