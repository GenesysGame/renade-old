// Rize RP. GGame Studio. 12.10.2017
// Camera tool client package

let keyboard = require('keyboard.js');

let camtool = {
    key: 114, // F3
    run: toggleCam
}

let left = {
    key: 37, // left arrow
    run: leftCam
}

let right = {
    key: 39, // right arrow
    run: rightCam
}

let up = {
    key: 38, // up arrow
    run: upCam
}

let down = {
    key: 40, // down arrow
    run: downCam
}

let forward = {
    key: 87, // w
    run: forwardCam
}

let backward = {
    key: 83, // s
    run: backwardCam
}

let moveLeft = {
    key: 65, // a
    run: moveLeftCam
}

let moveRight = {
    key: 68, // d
    run: moveRightCam
}

let moveUp = {
    key: 16, // shift
    run: moveUpCam
}

let moveDown = {
    key: 17, // ctrl
    run: moveDownCam
}

let camtoolWindow = {
    browser: mp.browsers.new('package://web/camtool/index.html'),
    key: 69 // e
}

camtoolWindow.browser.active = false;

keyboard.bindAction(camtool);
keyboard.bindWindow(camtoolWindow);

keyboard.bindAction(left);
keyboard.bindAction(right);
keyboard.bindAction(up);
keyboard.bindAction(down);

keyboard.bindAction(forward);
keyboard.bindAction(backward);
keyboard.bindAction(moveLeft);
keyboard.bindAction(moveRight);
keyboard.bindAction(moveUp);
keyboard.bindAction(moveDown);

var state = false;

let cam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(1, 0, 0), 60);

function toggleCam() {
    state = !state;
    cam.setActive(state);
    mp.game.cam.renderScriptCams(state, false, 0, true, false);

    var pos;
    mp.players.forEach(player => {
        pos = player.getCoords(true);
    });
    cam.setCoord(pos.x, pos.y, pos.z + 1);
    mp.gui.chat.push('Start cam with pos: (' + pos.x.toFixed(4) + ', ' + pos.y.toFixed(4) + ', ' + pos.z.toFixed(4) + ')');
}

// MARK: - Rotate camera

function leftCam() {
    if(state){
        let rot = cam.getRot(2);
        rot.z = Math.round(rot.z) + 1;
        cam.setRot(rot.x, 0, rot.z, 2);
        mp.gui.chat.push("TEST: " + rot.z);
    }
}

function rightCam() {
    if(state){
        let rot = cam.getRot(2);
        rot.z = Math.round(rot.z) - 1;
        cam.setRot(rot.x, 0, rot.z, 2);
        mp.gui.chat.push("TEST: " + rot.z);
    }
}

function upCam() {
    if(state){
        let rot = cam.getRot(2);
        rot.x = Math.round(rot.x) + 1;
        cam.setRot(rot.x, 0, rot.z, 2);
        mp.gui.chat.push("TEST: " + rot.x);
    }
}

function downCam() {
    if(state){
        let rot = cam.getRot(2);
        rot.x = Math.round(rot.x) - 1;
        cam.setRot(rot.x, 0, rot.z, 2);
        mp.gui.chat.push("TEST: " + rot.x);
    }
}

// MARK: - Move camera

function forwardCam() {
    if(state){
        let pos = cam.getCoord();
        let rot = cam.getRot(2);
        if(rot.z >= (-90) && rot.z <= 0){
            let newposx = (-rot.z * 10) / 900;
            pos.x = pos.x + newposx;
            pos.y = pos.y + (1 - newposx);
        } else if(rot.z > 0 && rot.z <= 90){
            let newposx = (rot.z * 10) / 900;
            pos.x = pos.x - newposx;
            pos.y = pos.y + (1 - newposx);
        } else if(rot.z < (-90) && rot.z >= (-180)){
            let newposx = ((-rot.z - 90) * 10) / 900;
            pos.x = pos.x + (1 - newposx);
            pos.y = pos.y - newposx;
        } else if(rot.z > 90 && rot.z < 180){
            let newposx = ((rot.z - 90) * 10) / 900;
            pos.x = pos.x - (1 - newposx);
            pos.y = pos.y - newposx;
        }
        cam.setCoord(pos.x, pos.y, pos.z);
        mp.gui.chat.push('Test x ' + pos.x);
        mp.gui.chat.push('Test y ' + pos.y);
    }
}

function backwardCam() {
    if(state){
        let pos = cam.getCoord();
        let rot = cam.getRot(2);
        if(rot.z >= (-90) && rot.z <= 0){
            let newposx = (-rot.z * 10) / 900;
            pos.x = pos.x - newposx;
            pos.y = pos.y - (1 - newposx);
        } else if(rot.z > 0 && rot.z <= 90){
            let newposx = (rot.z * 10) / 900;
            pos.x = pos.x + newposx;
            pos.y = pos.y - (1 - newposx);
        } else if(rot.z < (-90) && rot.z >= (-180)){
            let newposx = ((-rot.z - 90) * 10) / 900;
            pos.x = pos.x - (1 - newposx);
            pos.y = pos.y + newposx;
        } else if(rot.z > 90 && rot.z < 180){
            let newposx = ((rot.z - 90) * 10) / 900;
            pos.x = pos.x + (1 - newposx);
            pos.y = pos.y + newposx;
        }
        cam.setCoord(pos.x, pos.y, pos.z);
        camera.pointAtCoord(pos.x, pos.y, pos.z);
        mp.gui.chat.push('Test x ' + pos.x);
        mp.gui.chat.push('Test y ' + pos.y);
    }
}

function moveRightCam() {
    if(state){
        let pos = cam.getCoord();
    let rot = cam.getRot(2);
        if(rot.z >= (-90) && rot.z <= 0){
            let newposx = (-rot.z * 10) / 900;
            pos.x = pos.x + (1 - newposx);
            pos.y = pos.y - newposx;
        } else if(rot.z > 0 && rot.z <= 90){
            let newposx = (rot.z * 10) / 900;
            pos.x = pos.x + (1 - newposx);
            pos.y = pos.y + newposx;
        } else if(rot.z < (-90) && rot.z >= (-180)){
            let newposx = ((-rot.z - 90) * 10) / 900;
            pos.x = pos.x - newposx;
            pos.y = pos.y - (1 - newposx);
        } else if(rot.z > 90 && rot.z < 180){
            let newposx = ((rot.z - 90) * 10) / 900;
            pos.x = pos.x - newposx;
            pos.y = pos.y + (1 - newposx);
        }
        cam.setCoord(pos.x, pos.y, pos.z);
        mp.gui.chat.push('Test ' + pos.y);
    }
}

function moveLeftCam() {
    if(state){
        let pos = cam.getCoord();
        let rot = cam.getRot(2);
        if(rot.z >= (-90) && rot.z <= 0){
            let newposx = (-rot.z * 10) / 900;
            pos.x = pos.x - (1 - newposx);
            pos.y = pos.y + newposx;
        } else if(rot.z > 0 && rot.z <= 90){
            let newposx = (rot.z * 10) / 900;
            pos.x = pos.x - (1 - newposx);
            pos.y = pos.y - newposx;
        } else if(rot.z < (-90) && rot.z >= (-180)){
            let newposx = ((-rot.z - 90) * 10) / 900;
            pos.x = pos.x + newposx;
            pos.y = pos.y + (1 - newposx);
        } else if(rot.z > 90 && rot.z < 180){
            let newposx = ((rot.z - 90) * 10) / 900;
            pos.x = pos.x + newposx;
            pos.y = pos.y - (1 - newposx);
        }
        cam.setCoord(pos.x, pos.y, pos.z);
        mp.gui.chat.push('Test ' + pos.y);
    }
}

function moveUpCam() {
    if(state){
        let pos = cam.getCoord();
        cam.setCoord(pos.x, pos.y, pos.z + 1);
        mp.gui.chat.push('Test ' + pos.z);
    }
}

function moveDownCam() {
    if(state){
        let pos = cam.getCoord();
        cam.setCoord(pos.x, pos.y, pos.z - 1);
        mp.gui.chat.push('Test ' + pos.z);
    }
}