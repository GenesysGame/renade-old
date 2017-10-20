// Renade RP. GGame Studio. 12.10.2017
// Camera tool client package

let keyboard = require('keyboard.js');
let freecam = require('web/camtool/freecam.js');

freecam.init()

let camtoolWindow = {
    browser: mp.browsers.new('package://web/camtool/index.html'),
    key: 69 // e
}

camtoolWindow.browser.active = false;

keyboard.bindWindow(camtoolWindow, function () {
    return freecam.global.fly.flying;
});

var state = false;