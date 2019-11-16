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
    keys = []; //What key is pressed

/**/ //Update function where movement is handeled
function update() {
    requestAnimationFrame(update);

    //Checking if the keys are pressed down
    if /*W*/ (keys[87]) {
        if (velY > -speed) {
            velY--;
        }
    }
    if /*S*/ (keys[83]) {
        if (velY < speed) {
            velY++;
        }
    }
    if /*D*/ (keys[68]) {
        if (velX < speed) {
            velX++;
        }
    }
    if /*A*/ (keys[65]) {
        if (velX > -speed) {
            velX--;
        }
    }

    /**/ //Bullet bounds check
    if (bulletxc < (WIDTH + 40)){
        /**/ //Bullet moving if it is in frame
        if (bulletVelocity < bulletSpeed) {
            bulletVelocity++;
        }
        /**/
    } else {
        bulletxc = 120;
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
        alert("Collision Detected");
    }
    /**/
}
/**/

update(); //Runnning the update function

/**/ //Key down and up event listeners so the button activates on down press and deactivates on up release
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
/**/

/**/ //End Setting canvas
let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);
/**/