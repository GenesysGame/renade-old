// Renade RP. GGame Studio. 23.10.2017
// Gun tool client package

let keyboard = require('keyboard.js');

let guntoolWindow = {
    browser: mp.browsers.new('package://guntool/web/index.html'),
    key: 114 // F3
}
guntoolWindow.browser.active = false;
keyboard.bindWindow(guntoolWindow);

mp.events.add('guntool:givePressed', function (hash) {
    mp.events.callRemote('guntool:giveWeapon', hash);
});

mp.events.add('guntool:modifyPressed', function () {
    let player = mp.players.local;
    mp.game.graphics.notify('Current id is: ' + player.getType());
    mp.events.callRemote('guntool:modify');
});

mp.events.add('guntool:modify:weaponReceived', function (weapon) {
    mp.game.graphics.notify('Current weapon is: ' + weapon);
});