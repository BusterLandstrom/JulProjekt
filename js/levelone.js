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
createImage = function(img, x, y, iheight, iwidth){
    ctx.drawImage(img, x, y, iheight, iwidth);
};
/**/

/**/ //CSS function to get font size and font family easier
function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
};
/**/

var invOn = false, //Setting so that the inventory is not viewing all the time
    invButtonX = 800, //Inv button x coordinates
    invButtonY = 36, //Inv button y coordinates
    invButtonW = 128, //Inventory button width
    invButtonH = 128, //Inventory button height
    running = false, //If character is running or not
    fadingVal = 1024, //Fading in value
    fadingDisVal = 10, //Fading value for text to disappear after it has appeared
    i = -1, //I variable for text writing
    /**/ //Text for  talking
    story1 = "hejsan",
    story2 = "hallåsan",
    story21 = "huh?",
    story3 = "duuude",
    /**/
    p = document.getElementById('ptext'), //Getting p element so i can use its font
    pfont = css( p, 'font-family' ), //Setting text font from css
    velY = 0, //velocity on the y axis for the character
    velX = 0, //Velocity on the x axis for the character
    speed = 8, //Max speed fo the character
    friction = 2, //Friction for the character
    keys = [], //What key is pressed
    bedx  = 230,
    bedy = 589,
    bedw = 200,
    bedh = 66;

/**/ //Update function where movement is handeled
function update() {
    requestAnimationFrame(update); //Runs update function every frame

    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    lvlImg = document.getElementById('lvlbg');
    bgimglvl = createImage(lvlImg,0,0,WIDTH,HEIGHT);    

    walkingScript(keys,velX,velY,speed,friction,694,233,547,177); //Updates walking animaiton and scripts

    //bulletScript(HEIGHT);
    //grimBulletScript();
    
    addItemToInv(invOn);
    
    emptyImg = document.getElementById("empty");
    
    if (x > 590 && x < 720 && y > 338 && y < 478){
        if (x > 590 && x < 720){
            x = x - speed;
        }
        if(y > 338 && y < 400){
            y = y - speed;
        } else if(y < 478 && y > 400){
            y = y + speed;
        }
    }
        
    console.log(x,y);
    /**/ //Checks for bed collision
    if (x > 230 && x < 413 && y > 472 && y < 580){
        x = x + speed;
        y = y - speed;
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
        startDialogue = createText('white', pfont, "20px", story1, 40, 640);
    } else if ((fadingDisVal > -10) && (fadingDisVal < 0)){
        secondDialogue = createText('white', pfont, "20px", story2, 40, 640);
        secondDialogue2 = createText('white', pfont, "20px", story21, 40, 670);
    } else if ((fadingDisVal < -10) && (fadingDisVal > -20)){
        secondDialogue = createText('white', pfont, "20px", story3, 40, 640);
    }
    /**/

    /**/ //Starting start text/dialogue
    if (fadingRect == 1){
        fadingRect = 0;
        setInterval(changeFadeVal,2000);
    }
    /**/
    
    /**/ //Setting the stat bars
    staminaProgressBar = stamBar('noFill', 'fill');
    healthProgressBar = healthBar();
    /**/

    itemAdd(); //Spawns item in level

    if ((x <= 660 && x >= 570) && (y >= 470 && y <= 510)) {
        if(keys[70]){
            alert('read letter');
        }
    }

    /**/ //Set the inventory
    inventoryImg = document.getElementById('inventory');
    invImg = document.getElementById('invLogo');
    invLogo = createImage(invImg, invButtonX, invButtonY, invButtonW, invButtonH);
    if(invOn){
        inventoryObj = createImage(inventoryImg, 150, 130, 740, 540);
    } else if (!invOn){
        //Do nothing
    }
    /**/
}
/**/

function changeFadeVal(){
    fadingVal = -3;
}

/**/ //Loads the loading box
function load(){
    ctx.fillStyle = "black";
    fadingRect = ctx.fillRect(0, 0, fadingVal, HEIGHT)
}
/**/

/**/ //createText function for easy text creation
createText = function(fillStyles, fonts, fontsize, text, x, y) {
    ctx.font = fontsize + " " + fonts;
    ctx.fillStyle = fillStyles;
    ctx.fillText(text, x, y);
};
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

/**/ //Equip item function
function equipItem(e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var eqInvX = equipxc + bW;
    var eqInvY = equipyc + bH;
    if((x>=equipxc && y>=equipyc) && (x<=eqInvX && y<=eqInvY)){
        if (invOn){
            if (!swordEquipped){
                swordEquipped = true;
                alert("equipped");
            } else if (swordEquipped){
                swordEquipped = false;
                alert("unequipped");
            }
        } 
    }
}
/**/

/**/ //Remove item from inventory function
function removeItem(e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var rmInvX = removexc + bW;
    var rmInvY = removeyc + bH;
    if((x>=removexc && y>=removeyc) && (x<=rmInvX && y<=rmInvY)){
        if (invOn){
            inventory = []
            swordDropped = true;
            swordPickedUp = false;
            alert("removed");
        }
    }
}
/**/

canvas.addEventListener("click", equipItem, false); //Equip item event listener
canvas.addEventListener("click", removeItem, false); //Remove item event listener

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