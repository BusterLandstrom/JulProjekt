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

/**/ //CSS function to get font size and font family easier
function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
};
/**/

var x = 320,  //Starting x for the character
    y = 450,  //Starting y for the character
    velY = 0, //velocity on the y axis for the character
    velX = 0, //Velocity on the x axis for the character
    speed = 3, //Max speed fo the character
    friction = 0.75, //Friction for the character
    characterWidth = 100, //Width of the main character
    characterHeight = 120, //Height of the character
    bulletWidth = 40, //Projectile Width
    bulletHeight = 40, //Projectile Height
    bulletxc = 120, //Projectile x coordnates
    bulletyc = 320, //Projectile y coordinates
    bulletVelocity = 0, // Bullet velocity
    bulletFriction = 1, // Bullet friction
    bulletSpeed = 6, //Projectile speed
    charHealthPoints = 10, //Character hp
    i = -1, //I variable for text writing
    letter = [], //Text writing array
    /**/ //Text for  talking
    text =  new Array(
        "H",
        "e",
        "l",
        "l",
        "o",
        " ",
        "d",
        "u",
        "d",
        "e",
        ),
    /**/
    p = document.getElementById('ptext'), //Getting p element so i can use its font
    pfont = css( p, 'font-family' ), //Setting text font from css
    keys = []; //What key is pressed

/**/ //Update function where movement is handeled
function update() {
    requestAnimationFrame(update); //Updates canvas every frame

    /**/ //Checking if the keys are pressed down and changes velocity accordingly
    if /*W & uparrow*/ (keys[87] || keys[38]) {
        if (velY > -speed) {
            velY--;
        }
    }
    if /*S & downarrow*/ (keys[83] || keys[40]) {
        if (velY < speed) {
            velY++;
        }
    }
    if /*D & rightarrow*/ (keys[68] || keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if /*A & leftarrow*/ (keys[65] || keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }
    /**/

    /**/ //Bullet bounds check
    if (bulletxc < (WIDTH + 40)){
        /**/ //Bullet moving if it is in frame
        if (bulletVelocity < bulletSpeed) {
            bulletVelocity++;
        }
        /**/
    } else {        
        bulletxc = 120; //Setting start position
    }
    /**/

    /**/ //Applies friction and move the character
    bulletVelocity *= bulletFriction;
    bulletxc += bulletVelocity;
    /**/

    /**/ // Applying friction so the character stops and moves according to the physics
    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;
    /**/

    /**/ // Checking for bounds On the x axis
    if (x >= (WIDTH - 78)) {
        x = (WIDTH - 78);
    } else if (x <= 3) {
        x = 3;
    }
    /**/

    /**/ // Checking for bounds On the y axis
    if (y > (HEIGHT - 120)) {
        y = (HEIGHT - 120);
    } else if (y <= 3) {
        y = 3;
    }
    /**/

    /**/ //Drawing the placeholder character
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    characterImg = document.getElementById('character');
    character = new createImage(characterImg, x, y, characterWidth, characterHeight);
    /**/

    /**/ //Drawing and setting collision hitbox for projectile
    bulletImg = document.getElementById('bullet');
    bullet = new createImage(bulletImg, bulletxc, bulletyc, bulletWidth, bulletHeight);
    var bulletx = bulletxc + (bulletWidth - 32);
    var bullety = bulletyc + bulletHeight;
    var combineX = x + characterWidth;
    var combineY = y + characterHeight;
    if((bulletyc<=combineY && y<=bullety) && (x<=bulletx && combineX>=bulletxc)){
        //alert("Collision Detected");
        bulletxc = 120;
        updateText();
        charHealthPoints += -1;
    }
    /**/
    let healthPointText = createText("black", pfont, "20px", "Health: " + charHealthPoints, 26, 36);
    let writtenText = createText("black", pfont, "50px", letter.join(""), 510, 100);
    if (charHealthPoints <= 0){
        window.open('death.html','_self');
    }
}
/**/
function increaseI(){
    i += 1;
}

function writeText(){
    letter[i] = text[i];
}

createText = function(fillStyles, fonts, fontsize, text, x, y) {
    ctx.font = fontsize + " " + fonts;
    ctx.fillStyle = fillStyles;
    ctx.fillText(text, x, y);
};

function updateText(){
    requestAnimationFrame(updateText);


    writeText();
    increaseI();
}

update(); //Runnning the update function

/**/ //Key down and up event listeners so the button activates on down press and deactivates on up release
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
/**/

/**/ //Appending canvas to main
let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);
/**/