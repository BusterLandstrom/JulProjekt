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
    charHealthPoints = 100, //Character hp
    stamina = 20, //Setting up stamina for player dash
    staminaMax = 20, //Setting up stamina for player dash
    staminaW = 200, //StaminaBar width also used for health bar
    staminaH = 20, //StaminaBar height also used for health bar
    maxCharHealthPoints = 100, //Max hp for character
    invOn = false, //Setting so that the inventory is not viewing all the time
    invButtonX = 900, //Inv button x coordinates
    invButtonY = 36, //Inv button y coordinates
    invButtonW = 512/6, //Inventory button width
    invButtonH = 512/6, //Inventory button height
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

    /**/ //Setting override for both stamina and health
    if(stamina > staminaMax){
        stamina = staminaMax
    } else if(stamina <= 0){
        //Do nothing
    } if (charHealthPoints > maxCharHealthPoints){
        charHealthPoints = maxCharHealthPoints
    } else if (charHealthPoints <= 0){
        window.open('death.html','_self');
    }
    /**/

    /**/ //Dashing mechanic
    if /*W & uparrow*/ ((keys[87] || keys[38]) && keys[81]) {
        if(stamina > 0){
            if (velY > -(speed)) {
                speed = 10;
                velY--;
                stamina += -1;
            }
        } else {
            if (velY > -speed) {
                velY--;
            }
        }
    }
    if /*S & downarrow*/ ((keys[83] || keys[40]) && keys[81]) {
        if(stamina > 0){
            if (velY < speed) {
                speed = 10;
                velY++;
                stamina += -1;
            }
        } else {
            if (velY < speed) {
                velY++;
            }
        }
    }
    if /*D & rightarrow*/ ((keys[68] || keys[39]) && keys[81]) {
        if(stamina > 0){
            if (velX < speed) {
                speed = 10;
                velX++;
                stamina += -1;
            }
        } else {
            if (velX < speed) {
                velX++;
            }
        }
    }
    if /*A & leftarrow*/ ((keys[65] || keys[37]) && keys[81]) {
        if(stamina > 0){
            if (velX > -speed) {
                speed = 10;
                velX--;
                stamina += -1;
            }
        } else {
            if (velX > -speed) {
                velX--;
            }
        }
    }
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
    character = createImage(characterImg, x, y, characterWidth, characterHeight);
    /**/

    /**/ //Set the inventory
    inventoryImg = document.getElementById('inventory');
    invImg = document.getElementById('invLogo');
    invLogo = createImage(invImg, invButtonX, invButtonY, invButtonW, invButtonH);
    if(invOn){
        character = createImage(inventoryImg, 200, 160, 640, 420);
    } else if (!invOn){
        //Do nothing
    }
    /**/

    /**/ //Setting the stat bars
    staminaProgressBar = stamBar('noFill', 'fill');
    healthProgressBar = healthBar();
    /**/
}
/**/

/**/ //Function that increases the i value so that text is displayed properly letter after letter
function increaseI(){
    i += 1;
}
/**/

/**/ //Updates the letter array and puts correct letter in correct spot
function writeText(){
    letter[i] = text[i];
}
/**/

/**/ //createText function for easy text creation
createText = function(fillStyles, fonts, fontsize, text, x, y) {
    ctx.font = fontsize + " " + fonts;
    ctx.fillStyle = fillStyles;
    ctx.fillText(text, x, y);
};
/**/

/**/ //Updates and animates the text so it looks like it is being written
function updateText(){
    requestAnimationFrame(updateText);
    writeText();
    increaseI();   
}
/**/

/**/ //Stamina bar
stamBar = function(imgid,imgid2){
    barimg = document.getElementById(imgid);
    barimgfill = document.getElementById(imgid2);
    barNo = createImage(barimg, 26, 80, staminaW, staminaH)
    barFill = createImage(barimgfill, 26, 80, stamina * 10, staminaH);
    staminaText = createText("black", pfont, "17px", "Stamina: " + stamina + "/" + staminaMax, 32, 96);
}
/**/

/**/ //Health bar
healthBar = function (){
    hpbar = document.getElementById('noFill');
    barimgHP = document.getElementById('HPfill');
    barNoHP = createImage(hpbar, 26, 36, staminaW, staminaH)
    barFillHP = createImage(barimgHP, 26, 36, charHealthPoints * 2, staminaH);
    healthPointText = createText("black", pfont, "17px", "Health: " + charHealthPoints + "/" + maxCharHealthPoints, 32, 52);
}
/**/

canvas.addEventListener("click", invClick, false); //Event listener so the inventory button click funtion works

/**/ //Inventory click
function invClick(e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var invX = invButtonX + invButtonW;
    var invY = invButtonY + invButtonH;
    if((x>=invButtonX && y>=invButtonY) && (x<=invX && y<=invY)){
        if (!invOn){
            invOn = true;
        } else if (invOn){
            invOn = false;
        }
    }
}
/**/

update(); //Update function (always running and updating every frame)

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