﻿// Renade RP. GGame Studio. 12.10.2017
// Camera tool client package

let keyboard = require('keyboard.js');
let freecam = require('camtool/freecam.js');

var free = freecam.init();

let camtoolWindow = {
    browser: mp.browsers.new('package://camtool/web/index.html'),
    key: 69 // e
}

camtoolWindow.browser.active = false;

keyboard.bindWindow(camtoolWindow, function () {
    if (!free.fly.flying) return false;
    if (script) {
        toggle(false);
        script = null;
        return false;
    } else {
        if (camtoolWindow.browser.active) { // camtool window will disappear
            free.canExitFreecam = true;                    
        } else { // camtool window will appear
            free.canExitFreecam = false;
        }
    }
    return true;
});

// MARK: - Scripted cameras

var script = null;

mp.events.add('camtool:pickCoords', function (id) {
    let pos = mp.players.local.position;
    camtoolWindow.browser.execute(`pickCallback('${id}', '${pos.x}', '${pos.y}', '${pos.z}');`);
});

mp.events.add('camtool:pickRotation', function (id) {
    let rot = mp.game.cam.getGameplayCamRot(0);
    camtoolWindow.browser.execute(`pickCallback('${id}', '${rot.x}', '${rot.y}', '${rot.z}');`);
});

// enable\disable cripted camera
function toggle(toggle) {
    script.camera.setActive(toggle);
    mp.game.cam.renderScriptCams(toggle, false, 0, true, false);

    mp.gui.chat.show(!toggle);
    camtoolWindow.browser.active = !toggle;
    mp.gui.cursor.visible = !toggle;
}

// calculate an offset between start point and end point for delta time
function lerp(v1, v2, delta) {
    return new mp.Vector3(
        v1.x + ((v2.x - v1.x) * delta),
        v1.y + ((v2.y - v1.y) * delta),
        v1.z + ((v2.z - v1.z) * delta)
    );
}

// calculate rotation offset
function lerpRot(v1, v2, delta, clockwise) {
    var endZ = v2.z;
    if (endZ < v1.z && !clockwise) {
        endZ += 360;
    } else if (endZ > v1.z && clockwise) {
        endZ -= 360;
    }
    return new mp.Vector3(
        v1.x + ((v2.x - v1.x) * delta),
        v1.y + ((v2.y - v1.y) * delta),
        v1.z + ((endZ - v1.z) * delta)
    );
}

// calculate an angle between vectors OA and OB
function angle(current, target) {
    let a = {
        x: target.x - current.x,
        y: target.y - current.y,
        z: target.z - current.z
    };
    let rotZ = (Math.atan2(a.y, a.x) * 180 / Math.PI) - 90;
    let rotX = Math.atan2(a.z, Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2))) * 180 / Math.PI;

    return new mp.Vector3(rotX, 0, rotZ);
}
// MARK: - Linear camera

mp.events.add('camtool:startLinearCamera', function (id, sx, sy, sz, ex, ey, ez, srx, sry, srz, erx, ery, erz, clockwise, d) {
    let start = new mp.Vector3(sx, sy, sz);
    let end = new mp.Vector3(ex, ey, ez);
    let startRotation = new mp.Vector3(srx, sry, srz);
    let endRotation = new mp.Vector3(erx, ery, erz);
    let duration = d * 1000;

    script = {
        camera: mp.cameras.new('default', start, startRotation, 60.0),
        id: id,
        start: start,
        end: end,
        startRotation: startRotation,
        endRotation: endRotation,
        clockwise: clockwise,
        duration: duration,
        startTime: new Date().getTime()
    }

    toggle(true);
});

// MARK: - Linear target camera

mp.events.add('camtool:startLinearTargetCamera', function (id, sx, sy, sz, ex, ey, ez, tx, ty, tz, d) {
    let start = new mp.Vector3(sx, sy, sz);
    let end = new mp.Vector3(ex, ey, ez);
    let target = new mp.Vector3(tx, ty, tz);
    let duration = d * 1000;

    script = {
        camera: mp.cameras.new('default', start, new mp.Vector3(0, 0, 0), 60.0),
        id: id,
        start: start,
        end: end,
        target: target,
        duration: duration,
        startTime: new Date().getTime()
    }

    toggle(true);
});

// MARK: - Render

mp.events.add('render', () => {
    if (!script) return;

    let currentTime = new Date().getTime();
    let progress = (currentTime - script.startTime) / script.duration;

    if (progress > 1) {
        toggle(false);
        script = null;
        return;
    }

    if (script.id == 'linear') {
        let pos = lerp(script.start, script.end, progress);
        let rot = lerpRot(script.startRotation, script.endRotation, progress, script.clockwise);
        script.camera.setCoord(pos.x, pos.y, pos.z);
        script.camera.setRot(rot.x, rot.y, rot.z, 2);
    } else if (script.id == 'linear_target') {
        let pos = lerp(script.start, script.end, progress);
        let rot = angle(pos, script.target);
        script.camera.setCoord(pos.x, pos.y, pos.z);
        script.camera.setRot(rot.x, rot.y, rot.z, 2);
    }
});
