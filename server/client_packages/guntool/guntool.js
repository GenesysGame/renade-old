// Renade RP. GGame Studio. 23.10.2017
// Gun tool client package

let keyboard = require('keyboard.js');

let guntoolWindow = {
    browser: mp.browsers.new('package://guntool/web/index.html'),
    key: 114 // F3
}
guntoolWindow.browser.active = false;
keyboard.bindWindow(guntoolWindow);
