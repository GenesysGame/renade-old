// Rize RP. GGame Studio. 15.10.2017
// Test camera tool client package

let testcam = require('web/testcam/testcam.js')
let keyboard = require('keyboard.js');

let cambinder = {
    key: 115, // F4
    run: testCam
}

keyboard.bindAction(cambinder);
testcam.init();

var toggle = false;
function testCam(startx = 0, starty = 0, startz = 75, stopx = 1337, stopy = 1448, stopz = 228) {
    toggle = !toggle;
    const cam = mp.cameras.new('default', new mp.Vector3(0, 0, 75), new mp.Vector3(), 90.0);
    cam.setActive(toggle);
    mp.game.cam.renderScriptCams(toggle, false, 0, true, false);
    if (toggle) {
        testcam.interpolateCam(cam, [new mp.Vector3(startx, starty, startz), new mp.Vector3(stopx, stopy, stopz)], 1);
    }
}

mp.events.add("camtool:cordsselected", testCam);