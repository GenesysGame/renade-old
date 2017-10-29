// Renade RP. GGame Studio. 23.10.2017
// Gun tool client package

let keyboard = require('keyboard.js');
let components = require('guntool/components');

let guntoolWindow = {
    browser: mp.browsers.new('package://guntool/web/index.html'),
    key: 114 // F3
}
guntoolWindow.browser.active = false;
keyboard.bindWindow(guntoolWindow);

let modsWindow = {
    browser: mp.browsers.new('package://guntool/web/mods.html'),
    key: 115 // F4
}
modsWindow.browser.active = false;
keyboard.bindWindow(modsWindow);

mp.events.add('guntool:givePressed', function (hash) {
    mp.events.callRemote('guntool:giveWeapon', hash);
});

var mod = {
    component: null,
    weapon: null,
    add: function () {
        //let weaponModel = mp.game.weapon.getWeapontypeModel(this.weapon);
        //mp.gui.chat.push('test ' + weaponModel + ' ' + this.weapon);
        mp.game.weapon.giveWeaponComponentToWeaponObject(this.weapon, this.component);        
    }
};

mp.events.add('guntool:mods:addPressed', function (component) {
    mod.component = component;//mp.game.weapon.getWeaponComponentTypeModel(component);
    mp.events.callRemote('guntool:mods:getWeapon');
    //let comp = mp.game.weapon.getWeaponComponentTypeModel(component);
    //let player = mp.players.local;
    //let pos = player.position;
    //let object = mp.game.weapon.createWeaponObject(453432689, 100, pos.x + 1, pos.y, pos.z + 0.5, false, 0, 0);
    //mp.game.weapon.giveWeaponComponentToWeaponObject(object, component);    
    //mp.gui.chat.push('test ' + object);
});

mp.events.add('guntool:mods:weaponReceived', function (weapon) {
    mod.weapon = weapon;
    mod.add();
});
