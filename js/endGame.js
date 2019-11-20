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

var velY = 0, //velocity on the y axis for the character
    velX = 0, //Velocity on the x axis for the character
    speed = 8, //Max speed fo the character
    friction = 2, //Friction for the character
    characterWidth = 100, //Width of the main character
    characterHeight = 120, //Height of the character
    charHealthPoints = 10, //Character hp
    i = -1, //I variable for text writing
    shootTimeModifier = 0, //Setting shoot time delay to 0
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

    WalkingScript(keys,velX,velY,speed,friction,WIDTH,HEIGHT);

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

    writtenText = createText("black", pfont, "50px", letter.join(""), 510, 100);
    staminaProgressBar = stamBar('noFill', 'fill');
    healthProgressBar = healthBar();
}
/**/

/**/ //Function that increases the i value so that text is displayed properly letter after letter
function increaseI(){
    i += 1;
}
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

update();

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