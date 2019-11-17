Inventory = function(){
    var self = {
        items:[]
    };
    self.addItem = function(id, ammount){
        for(var i = 0; i < self.items.length; i++){
            if(self.items[i].id == id){
                self.items[i].ammount += ammount;
                return;
            }
        }
        self.items.push({
            id:id, ammount:ammount
        });
    }
    self.removeItem = function(id, ammount){
        for(var i = 0; i < self.items.length; i++){
            if(self.items[i].id == id){
                self.items[i].ammount = ammount;
                if(self.items[i].ammount <= 0){
                    self.items.splice(i,1);
                }
                return;
            }
        }
    }
    self.hasItem = function(id,ammount){
        for(var i = 0; i < self.items.length; i++){
            if(self.items[i].id == id){
                return self.items[i].ammount >= ammount
            }
        }
        return false;
    }
    item = function(id, name, event){
        var self = {
            id:id,
            name:name,
            event:event,
        };
        return self;
    }
    item('hpPotion','Healing Potion', function(){
        charHealthPoints += 20;
        removeItem('hpPotion', 1);
    });
}