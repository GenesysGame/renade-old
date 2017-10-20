// Renade RP. GGame Studio. 12.10.2017
// Camera tool client package

let keyboard = require('keyboard.js');
let freecam = require('camtool/freecam.js');

freecam.init()

let camtoolWindow = {
    browser: mp.browsers.new('package://camtool/web/index.html'),
    key: 69 // e
}

camtoolWindow.browser.active = false;

keyboard.bindWindow(camtoolWindow, function () {
    return freecam.global.fly.flying;
});

var state = false;