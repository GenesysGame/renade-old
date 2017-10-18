// Rize RP. GGame Studio. 15.10.2017
// Test camera tool client package

let interpolatecam = null;

function lerp(vector1, vector2, deltaTime) {
    return new mp.Vector3(
        vector1.x + (vector2.x - vector1.x) * deltaTime,
        vector1.y + (vector2.y - vector1.y) * deltaTime,
        vector1.z + (vector2.z - vector1.z) * deltaTime
    );

}

function init() {

    mp.events.add({
        'render': () => {
            if (interpolatecam) {
                interpolatecam.currentPosition = lerp(interpolatecam.positions[0], interpolatecam.positions[1], interpolatecam.progress);
                interpolatecam.progress = interpolatecam.progress + interpolatecam.speed / 1000;
                interpolatecam.cam.setCoord(interpolatecam.currentPosition.x, interpolatecam.currentPosition.y, interpolatecam.currentPosition.z);
                if (interpolatecam.progress >= 1) {
                    interpolatecam = null;
                }
            }
        }
    });
}

function interpolateCam(cam, positions, speed) {

    return interpolatecam = {
        cam,
        positions,
        speed,
        progress: 0,
        currentPosition: null
    };
}

exports.interpolateCam = interpolateCam;
exports.init = init;