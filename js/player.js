var x = 320,  //Starting x for the character
    y = 450,  //Starting y for the character 
    characterWidth = 100, //Width of the main character
    characterHeight = 120, //Height of the character
    charHealthPoints = 100, //Character hp
    stamina = 20, //Setting up stamina for player dash
    staminaMax = 20, //Setting up stamina for player dash
    staminaW = 200, //StaminaBar width also used for health bar
    staminaH = 20, //StaminaBar height also used for health bar
    maxCharHealthPoints = 100, //Max hp for character
    running = false, //If character is running or not
    keys = []; //What key is pressed

/**/ //Movement function
function WalkingScript(keys,velX,velY,speed,friction,WIDTH,HEIGHT) {

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

    /**/ //Drawing the placeholder character
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    character = createImage(characterImg, x, y, characterWidth, characterHeight);
    /**/

    /**/ //Key down and up event listeners so the button activates on down press and deactivates on up release
    document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
    });
/**/
}

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