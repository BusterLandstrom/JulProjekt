/**/ //Setting up the canvas
const WIDTH = 1024;
const HEIGHT = 768;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.setAttribute("class", "border");
canvas.width = WIDTH;
canvas.height = HEIGHT;
/**/

let startButtonWidth = 300; //Setting the start button width
let startButtonHeight = 80; //Setting the start button height
let startButtonX = 350; //Setting the x position on the canvas for the start button
let startButtonY = 420; //Setting the y position on the canvas for the start button

/**/ //Create image function for easier image creation and nameing
createImage = function(img, x, y, dheight, dwidth){
ctx.drawImage(img, x, y, dheight, dwidth);
};
/**/

/**/ //CSS function to get font size and font family easier
function css( element, property ) {
   return window.getComputedStyle( element, null ).getPropertyValue( property );
}
/**/

backgroundMusic = new Audio('soundeffects/backgroundMusic.wav');

function update(){
   requestAnimationFrame(update);
   backgroundMusic.play();
}

update();

/**/ //Setting up for image and font drawing
let p = document.getElementById('ptext');
let pfont = css( p, 'font-family' );
let bgimg = document.getElementById('backgroundimage');
let img = document.getElementById('startGame');
let backgroundImg = createImage (bgimg, 0,0, WIDTH, HEIGHT);
let startButton = createImage( img, startButtonX, startButtonY, startButtonWidth, startButtonHeight);
/**/

/**/ //Setting the frame line
ctx.beginPath();
ctx.strokeStyle = 'brown';
ctx.lineWidth = '5';
ctx.rect(0,0,1024,768);
ctx.stroke();
/**/

/**/ //Setting the title text
ctx.font = "100px " +  pfont;
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.fillText("The Ghosts", 510, 165);
ctx.font = "110px " + pfont;
ctx.textAlign = 'center';
ctx.fillStyle = 'white'; 
ctx.fillText("of Christmas", 512, 298);
/**/

/**/ //Setting copyright text (for fun)
ctx.font = "20px " + pfont;
ctx.textAlign = 'center';
ctx.fillStyle = 'white'; 
ctx.fillText("© Copyright 2019", 510, 740);
/**/

/**/ //createText function for easy text creation
createText = function(fillStyles, fonts, fontsize, text, x, y) {
   ctx.font = fontsize + " " + fonts;
   ctx.fillStyle = fillStyles;
   ctx.fillText(text, x, y);
};
/**/

/**/ //Title screen "Tutorial"
createText('white', pfont, '40px', 'W,A,S,D = Walking', 510, 560);
createText('white', pfont, '40px', 'LShift = Sprint', 510, 600);
createText('white', pfont, '40px', 'F = Hit/Use', 510, 640);
createText('white', pfont, '40px', 'E = Block', 510, 680);
/**/

canvas.addEventListener("click", onStartClickEvent, false); //Event listener so the start button click funtion works

/**/ //Start button click function
function onStartClickEvent(e){
   var rect = canvas.getBoundingClientRect();
   var x = e.clientX - rect.left;
   var y = e.clientY - rect.top;
   var endX = startButtonX + startButtonWidth;
   var endY = startButtonY + startButtonHeight;
   if((x>=startButtonX && y>=startButtonY) && (x<=endX && y<=endY)){
      window.open('levelone.html','_self');
   }
};
/**/

/**/ //Appending canvas to main
let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);
/**/