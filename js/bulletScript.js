var bulletWidth = 40, //Projectile Width
    bulletHeight = 40, //Projectile Height
    bulletxc = 120, //Projectile x coordnates
    bulletyc = 320, //Projectile y coordinates
    bulletVelocity = 0, // Bullet velocity
    bulletFriction = 1, // Bullet friction
    bulletSpeed = 6, //Projectile speed
    projectileHit = new Audio("soundeffects/projectileHit.wav"), //Projectile hit sound
    projectileShoot = new Audio("soundeffects/projectileShoot.wav"), //Projectile hit sound
    canShoot = true; //Setting the boss shooting mechanics to true

/**/
function bulletScript() {

    if (bulletxc <= 127) {
        projectileShoot.play();
    }

    /**/ //Bullet bounds check
    if (bulletxc < (WIDTH + 40)) {
        /**/ //Bullet moving if it is in frame
        if (bulletVelocity < bulletSpeed) {
            bulletVelocity++;
        } else {
            bulletVelocity--;
            if (bulletxc < -10){
                bulletSpeed = 6;
                bulletxc = 2000;
            }
        }
        /**/
    }
    else {
        if (canShoot == true) {
            bulletxc = 120; //Setting start position
            canShoot = false;
            shootTimeModifier = 5;
            setInterval(updateShootMethod, 5000);
            bulletSpeed = 6;
        }
        else {
            //Do nothing
        }
    }
    /**/
    /**/ //Applies friction and move the character
    bulletVelocity *= bulletFriction;
    bulletxc += bulletVelocity;
    /**/
    /**/ //Drawing and setting collision hitbox for projectile
    bulletImg = document.getElementById('bullet');
    bullet = createImage(bulletImg, bulletxc, bulletyc, bulletWidth, bulletHeight);
    var bulletx = bulletxc + (bulletWidth - 32);
    var bullety = bulletyc + bulletHeight;
    var combineX = x + characterWidth;
    var combineY = y + characterHeight;
    if ((bulletyc <= combineY && y <= bullety) && (x <= bulletx && combineX >= bulletxc)) {
        // Collission with projectile detected run code
        for (var v = 0; v < inventory.length; v++){
            if(inventory[v] == "SwordofChristmas") {
                if(keys[69]){
                    bulletSpeed = -6;
                } else {
                    charHealthPoints += -25;
                    bulletxc = 2000;
                }
            } else {
                charHealthPoints += -25;
                bulletxc = 2000;
            }
        }
    }
    /**/
}
    /**/ //Shoot modifier for the boss
    function updateShootMethod() {
        if (shootTimeModifier >= 5) {
            shootTimeModifier = 0;
            canShoot = false;
        }
        else if (shootTimeModifier == 0) {
            shootTimeModifier = 5;
            canShoot = true;
        }
    }
    /**/
