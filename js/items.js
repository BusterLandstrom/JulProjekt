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
    itemId = [];


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