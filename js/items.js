var inventory = [],
    inventoryMax = 12,
    items = [
        "SwordofChristmas",
        "HealthPotion"
    ],
    swordPickedUp = false,
    swordDropped = false,
    swordEquipped = false,
    dropVal = 0,
    itemxc = 240, 
    itemyc = 240, 
    itemId = [],    
    healthPotionPickedUp = false,
    healthPotionDropped = false,
    healthPotionUse = false,
    healthPotionDropVal = 1,
    healthPotionitemxc = 100, 
    healthPotionitemyc = 100;


function addSword(id, itemWidth, itemHeight, xc, yc, charWidth, charHeight){
    /**/ //Drawing and setting collision hitbox for item
    itemImg = document.getElementById(items[id]);
    if (!swordPickedUp){
        if (!swordDropped){
            itemObj = createImage(itemImg, itemxc, itemyc, itemWidth, itemHeight);
            dropVal = 0;
        } else if (swordDropped){
            if (dropVal < 1){
                itemxc = x + 130;
                itemyc = y;
                dropVal = 1;
            }
            swordEquipped = false;
            itemObj = createImage(itemImg, itemxc, itemyc, itemWidth, itemHeight);
        }
    } else{
        itemWidth = 0;
        itemHeight = 0;
        itemxc = 0;
        itemyc = 0;
    }
    var itemx = itemxc + itemWidth;
    var itemy = itemyc + itemHeight;
    var bothX = xc + charWidth;
    var bothY = yc + charHeight;
    if((itemyc<=bothY && yc<=itemy) && (xc<=itemx && bothX>=itemxc)){
        // Collission with Item detected run code
        swordPickedUp = true;
        inventory.push(items[id]);
        console.log(inventory);
        swordDropped = false;
    }
    /**/
}

function addhealthPotion(id, healthPotionitemWidth, healthPotionitemHeight, xc, yc, charWidth, charHeight){
    healthPotionItemImg = document.getElementById(items[id]);
    if (!healthPotion){
        if (!healthPotionDropped){
            itemObj = createImage(healthPotionItemImg, healthPotionitemxc, healthPotionitemyc, healthPotionitemWidth, healthPotionitemHeight);
            DropVal = 1;
        } else if (healthPotion){
            if (healthPotionDropVal < 1){
                healthPotionitemxc = x + 130;
                healthPotionitemyc = y;
                healthPotionDropVal = 1;
            }
            healthPotionUse = false;
            itemObj = createImage(healthPotionItemImg, healthPotionitemxc, healthPotionitemyc, healthPotionitemWidth, healthPotionitemHeight);
        }
    } else{
       healthPotionitemWidth = 0;
        healthPotionitemHeight = 0;
        healthPotionitemxc = 0;
        healthPotionitemyc = 0;
    }
    var healthPotionitemx = healthPotionitemxc + healthPotionitemWidth;
    var healthPotionitemy = healthPotionitemyc + healthPotionitemHeight;
    var bothX = xc + charWidth;
    var bothY = yc + charHeight;
    if((healthPotionitemyc<=bothY && yc<=healthPotionitemy) && (xc<=healthPotionitemx && bothX>=healthPotionitemxc)){
        // Collission with Item detected run code
        healthPotionPickedUp = true;
        inventory.push(items[id]);
        console.log(inventory);
        healthPotionDropped = false;
    }
    /**/

}