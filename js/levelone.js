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
    running = false, //If character is running or not
    fadingVal = 1024, //Fading in value
    fadingDisVal = 10, //Fading value for text to disappear after it has appeared
    i = -1, //I variable for text writing
    letter = [], //Text writing array
    letter2 = [], //Text writing array
    letter3 = [], //Text writing array
    /**/ //Text for  talking
    text =  new Array(
        "A",
        "a",
        "a",
        "a",
        "a",
        "h",
        " ",
        "I",
        " ",
        "d",
        "e",
        "f",
        "i",
        "n",
        "i",
        "t",
        "e",
        "l",
        "y",
        " ",
        "d",
        "i",
        "d",
        "n",
        "'",
        "t",
        " ",
        "s",
        "l",
        "e",
        "e",
        "p",
        " ",
        "w",
        "e",
        "l",
        "l",
        ".",
        ),
    /**/
    /**/ //Text2 for  talking
    text2 =  new Array(
        "G",
        "o",
        "o",
        "d",
        " ",
        "m",
        "o",
        "r",
        "n",
        "i",
        "n",
        "g",
        " ",
        "G",
        "r",
        "e",
        "y",
        ".",
        "W",
        "e",
        " ",
        "c",
        "a",
        "n",
        " ",
        "s",
        "e",
        "e",
        " ",
        "t",
        "h",
        "a",
        "t",
        " ",
        "y",
        "o",
        "u",
        " ",
        "h",
        "a",
        "v",
        "e",
        " ",
        "n",
        "o",
        "t",
        " ",
        "s",
        "l",
        "e",
        "p",
        "t",
        " ",
        "w",
        "e",
        "l",
        "l",
        ".",
        ),
    /**/
    /**/ //Text3 for  talking
    text3 =  new Array(
        "W",
        "H",
        "O",
        " ",
        "A",
        "R",
        "E",
        " ",
        "Y",
        "O",
        "U",
        " ",
        "A",
        "N",
        "D",
        " ",
        "W",
        "H",
        "A",
        "T",
        " ",
        "A",
        "R",
        "E",
        " ",
        "Y",
        "O",
        "U",
        " ",
        "D",
        "O",
        "I",
        "N",
        "G",
        " ",
        "I",
        "N",
        " ",
        "M",
        "Y",
        " ",
        "H",
        "O",
        "U",
        "S",
        "E",
        "?",
        "!",
    ),
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
            running = false;
        }
    }
    if /*S & downarrow*/ (keys[83] || keys[40]) {
        if (velY < speed) {
            velY++;
            running = false;
        }
    }
    if /*D & rightarrow*/ (keys[68] || keys[39]) {
        if (velX < speed) {
            velX++;
            running = false;
        }
    }
    if /*A & leftarrow*/ (keys[65] || keys[37]) {
        if (velX > -speed) {
            velX--;
            running = false;
        }
    }
    /**/

    /**/ //Setting override for health
    if (charHealthPoints > maxCharHealthPoints){
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
                running = true;
            }
        } else {
            if (velY > -speed) {
                velY--;
                running = false;
            }
        }
    }
    if /*S & downarrow*/ ((keys[83] || keys[40]) && keys[81]) {
        if(stamina > 0){
            if (velY < speed) {
                speed = 10;
                velY++;
                running = true;
            }
        } else {
            if (velY < speed) {
                velY++;
                running = false;
            }
        }
    }
    if /*D & rightarrow*/ ((keys[68] || keys[39]) && keys[81]) {
        if(stamina > 0){
            if (velX < speed) {
                speed = 10;
                velX++;
                running = true;
            }
        } else {
            if (velX < speed) {
                velX++;
                running = false;
            }
        }
    }
    if /*A & leftarrow*/ ((keys[65] || keys[37]) && keys[81]) {
        if(stamina > 0){
            if (velX > -speed) {
                speed = 10;
                velX--;
                running = true;
            }
        } else {
            if (velX > -speed) {
                velX--;
                running = false;
            }
        }
    }
    /**/

    /**/ //Stamina override
    if (running){
        stamina += -0.04;
    } else if (!running){
        stamina += 0.02;
    } if(stamina <= 0){
        running = false;
    } else if (stamina > staminaMax){
        stamina = staminaMax;
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
        character = createImage(inventoryImg, 150, 130, 740, 540);
    } else if (!invOn){
        //Do nothing
    }
    /**/
    
    /**/ //Fading into scene on load
    window.onload = load();
    /**/

    /**/ //Setting the fading rect to get removed when scene is loaded
    if ((fadingVal <= WIDTH) && (fadingVal > 0)){
        fadingVal += -35;
    } if (fadingVal < -5){
        fadingRect = 1;
    }
    /**/

    if (fadingVal < 0){
        fadingDisVal += -0.045;
    }

    /**/ //Starting dialogue initial
    if(fadingDisVal > 0){
        startDialogue = createText('black', pfont, "20px", letter.join(""), 40, 640);
    } else if ((fadingDisVal > -10) && (fadingDisVal < 0)){
        secondDialogue = createText('black', pfont, "20px", letter2.slice(0,18).join(""), 40, 640);
        secondDialogue2 = createText('black', pfont, "20px", letter2.slice(18,62).join(""), 40, 670);
    } else if ((fadingDisVal < -10) && (fadingDisVal > -20)){
        secondDialogue = createText('black', pfont, "20px", letter3.join(""), 40, 640);
    }
    /**/

    /**/ //Starting start text/dialogue
    if (fadingRect == 1){
        updateText();
        fadingRect = 0;
        setInterval(changeFadeVal,2000);
    }
    /**/
    
    /**/ //Setting the stat bars
    staminaProgressBar = stamBar('noFill', 'fill');
    healthProgressBar = healthBar();
    /**/
}
/**/

function changeFadeVal(){
    fadingVal = -3;
}

/**/ //Function that increases the i value so that text is displayed properly letter after letter
function increaseI(){
    i += 1;
}
/**/

/**/ //Updates the letter array and puts correct letter in correct spot
function writeText(){
    letter[i] = text[i];
    letter2[i] = text2[i];
    letter3[i] = text3[i];
}
/**/

function load(){
    ctx.fillStyle = "black";
    fadingRect = ctx.fillRect(0, 0, fadingVal, HEIGHT)
}

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
    increaseI();
    writeText();
}
/**/

/**/ //Stamina bar
stamBar = function(imgid,imgid2){
    barimg = document.getElementById(imgid);
    barimgfill = document.getElementById(imgid2);
    barNo = createImage(barimg, 26, 80, staminaW, staminaH)
    barFill = createImage(barimgfill, 26, 80, stamina * 10, staminaH);
    staminaText = createText("black", pfont, "17px", "Stamina: " + Math.round(stamina) + "/" + staminaMax, 32, 96);
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