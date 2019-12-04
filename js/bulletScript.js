var bulletWidth = 40, //Projectile Width
    bulletHeight = 40, //Projectile Height
    bulletxc = enemyx, //Projectile x coordnates
    bulletyc = enemyy, //Projectile y coordinates
    bulletVelocity = 0, // Bullet velocity
    bulletFriction = 1, // Bullet friction
    bulletSpeed = 6, //Projectile speed
    enemyFric = 0.8, //Grim reaper friction
    enemyVel = 0, //Enemy velocity
    enemyx = 280, //Enemy x
    enemyy = 300, //Enemy y
    enemySpeed = 4, //Enemey speed
    projectileHit = new Audio("soundeffects/projectileHit.wav"), //Projectile hit sound
    projectileShoot = new Audio("soundeffects/projectileShoot.wav"), //Projectile hit sound
    initpos = 1,
    shootTimeModifier = 5,
    enemyW = 64,
    enemyH = 128,
    enemyHp = 1,
    left = true, //Enemy direction
    canShoot = true; //Setting the boss shooting mechanics to true
/**/

/**/ //Create image function for easier image creation and nameing
createImage = function(img, x, y, iheight, iwidth){
    ctx.drawImage(img, x, y, iheight, iwidth);
};
/**/

function bulletScript(HEIGHT) {

    /**/ //Play shoot sound when instantiated
    if (bulletxc <= enemyx + 10 && bulletyc <= enemyy + 10) {
        projectileShoot.play();
    }
    /**/

    /**/ //Bullet bounds check
    if (bulletyc < HEIGHT) {
        /**/ //Bullet moving if it is in frame
        if (bulletVelocity < bulletSpeed) {
            bulletVelocity++;
        } else {
            bulletVelocity--;
            if (bulletyc < 0){
                bulletSpeed = 6;
                bulletyc = 2000;
            }
        }
        /**/
    }
    else {
        if (canShoot == true) {
            if (initpos == 1){
                bulletxc = enemyx; //Setting start position
                bulletyc = enemyy; //Setting position
                initpos = 0; //Setting init value
                shootTimeModifier = Math.floor(Math.random() * 7) + 1;
            }
            bulletSpeed = 6; //Bullet speed set to 6 regardless of what has been set before
            canShoot = false; //Setting can shoot to false since the bullet was just shot
        }
        else {
            /**/ //Setting shoot time delay to get smaller every second 1/60 (since 1 sec = 60 frames and it updates every 60 frames) unitl bullet can be shot again
            shootTimeModifier += -0.01666667;
            if (shootTimeModifier > 0) {
                canShoot = false;
                initpos = 0;
            }
            else if (shootTimeModifier <= 0) {
                canShoot = true;
                initpos = 1;
            }
            /**/
        }
    }
    /**/

    /**/ //Applies friction and move the projectile
    bulletVelocity *= bulletFriction;
    bulletyc += bulletVelocity;
    /**/

    /**/ //Enemy boundscheck and auto move
    if (enemyx < 260){
        enemyx = 260;
        left = false;
    } else if (enemyx > 700){
        enemyx = 700;
        left = true;
    }
    /**/

    /**/ //Setting value to change direction
    if (left){
        if (enemyVel > -enemySpeed){
            enemyVel--;
        }

    } else if (!left){
        if (enemyVel < enemySpeed){
            enemyVel++;
        }
    }
    /**/

    /**/ //Enemy friction and moves enemy
    enemyVel *= enemyFric;
    enemyx += enemyVel;
    /**/
    
    /**/ //Drawing enemys
    grimReaperImg = document.getElementById('grim');
        /**/ //If enemy is not dead display the image
    if (enemyHp != 0){
        grimReaper = createImage(grimReaperImg, enemyx, enemyy, enemyW, enemyH);
    }
        /**/
    /**/

    /**/ //Drawing projectile
    bulletImg = document.getElementById('bullet');
    bullet = createImage(bulletImg, bulletxc, bulletyc, bulletWidth, bulletHeight);
    /**/

    /**/ //Setting hitbox values for enemy bullet and character
    var bulletx = bulletxc + (bulletWidth - 32);
    var bullety = bulletyc + bulletHeight;
    var combineX = x + characterWidth;
    var combineY = y + characterHeight;
    var combineEx = enemyx + enemyW;
    var combineEy = enemyy + enemyH;
    /**/

    /**/ //Bullet collision with player
    if ((bulletyc <= combineY && y <= bullety) && (x <= bulletx && combineX >= bulletxc)) {
        /**/ // Collission with projectile detected run code and check if character has sword equipped or nots (Changes will need to me made soon)
        if(inventory[0] == "SwordofChristmas") {
            if(keys[69]){
                if (swordEquipped){
                    bulletSpeed = -6;
                } else {
                    charHealthPoints += -25;
                    bulletyc = 2000;
                }
            } else {
                charHealthPoints += -25;
                bulletyc = 2000;
            }
        } else {
            charHealthPoints += -25;
            bulletyc = 2000;
        }
        /**/
    }
    /**/

    /**/ //Bullet collision with enemy
    if ((bulletyc <= combineEy && enemyy <= bullety) && (enemyx <= bulletx && combineEx >= bulletxc)) {
        /**/ //Checking if the bullt has been shot to the enemy and gets hit if deflection has been done
        if(bulletSpeed == -6) {
            enemyHp = 0;
        }
        /**/
    }
    /**/
}
