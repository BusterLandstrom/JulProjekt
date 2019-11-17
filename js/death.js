/**/ //Setting up the canvas
const WIDTH = 1024;
const HEIGHT = 768;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.setAttribute("class", "border");
canvas.width = WIDTH;
canvas.height = HEIGHT;
/**/

/**/ //Create image function for easier image creation and nameing
createImage = function(img, x, y, dheight, dwidth){
    ctx.drawImage(img, x, y, dheight, dwidth);
};
/**/

let restartButtonWidth = 630/2; //Setting the restart button width
let restartButtonHeight = 240/2; //Setting the restart button height
let restartButtonX = 337; //Setting the x position on the canvas for the restart button
let restartButtonY = 500; //Setting the y position on the canvas for the restart button

let restartImg = document.getElementById('restartGame'); //Getting the restart button from the scene
let gameOverImg = document.getElementById('gameOverImg'); //Getting the gameover screen from the scene
let backgroundImg = createImage (gameOverImg, 0,0, WIDTH, HEIGHT); //Setting values for the background image
let startButton = createImage( restartImg, restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight); //Setting values for the restart button

canvas.addEventListener("click", onStartClickEvent, false); //Event listener so the restartbutton click funtion works

/**/ //Restart button click function
function onStartClickEvent(e){
   var rect = canvas.getBoundingClientRect();
   var x = e.clientX - rect.left;
   var y = e.clientY - rect.top;
   var endX = restartButtonX + restartButtonWidth;
   var endY = restartButtonY + restartButtonHeight;
   if((x>=restartButtonX && y>=restartButtonY) && (x<=endX && y<=endY)){
      window.open('index.html','_self');
   }
};
/**/

deathSound = new Audio('/soundeffects/deathSound.wav');

deathSoundLoad();

function deathSoundLoad(){
   deathSound.play();
}

/**/ //Appending canvas to main
let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);
/**/