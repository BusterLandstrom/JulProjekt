var inventory = [],
    items = [
        "SwordofChristmas",
        "HealthPotion"
    ],
    pickedUp = false,
    itemId = [];


function addItem(id, itemxc, itemyc, itemWidth, itemHeight, xc, yc, charWidth, charHeight){
    /**/ //Drawing and setting collision hitbox for item
    itemImg = document.getElementById(items[id]);
    if (!pickedUp){
        itemObj = createImage(itemImg, itemxc, itemyc, itemWidth, itemHeight);
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
        pickedUp = true;
        inventory.push(items[id]);
        console.log(inventory);
    }
    /**/
}