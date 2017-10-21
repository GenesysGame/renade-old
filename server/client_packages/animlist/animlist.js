// Rize RP. GGame Studio. 1.10.2017
// Animations list client package

let keyboard = require('keyboard.js');

let testWindow = {
    browser: mp.browsers.new('package://animlist/web/index.html'),
    key: 113 // F2
}
testWindow.browser.active = false;

keyboard.bindWindow(testWindow);

mp.events.add("animlist:animationSelected", function () {
    let animName = arguments[0];
    let animProperty = arguments[1];
    mp.events.callRemote("player:animate", animName, animProperty);
});
