var inventory = [],
    inventoryMax = 12,
    items = [
        "SwordofChristmas",
        "HealthPotion"
    ],
    swordPickedUp = false,
    swordDropped = false,
    itemId = [];


function addItem(id, itemxc, itemyc, itemWidth, itemHeight, xc, yc, charWidth, charHeight){
    /**/ //Drawing and setting collision hitbox for item
    itemImg = document.getElementById(items[id]);
    if (!swordPickedUp){
        if (!swordDropped){
            itemObj = createImage(itemImg, itemxc, itemyc, itemWidth, itemHeight);
        } else if (swordDropped){
            var dropPoint = xc + 100;
            itemObj = createImage(itemImg, dropPoint, yc, itemWidth, itemHeight);
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