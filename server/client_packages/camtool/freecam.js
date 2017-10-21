// Renade RP. GGame Studio. 20.10.2017
// Camera tool: freecam

exports.init = init;
exports.global = global;

var global;

function init() {
    const controlsIds =
        {
            F5: 327,
            W: 32, //232
            S: 33, //31, 219, 233, 268, 269
            A: 34, //234
            D: 35, //30, 218, 235, 266, 267
            LAlt: 19,
            Shift: 21,
            LCtrl: 326
        };

    global.fly = {
        flying: false, df: 0.5, dl: 0.5, dh: 0.5, f: 0.5, l: 0.5, h: 0.5,
        maxSpeed: 2.0
    };
    global.canExitFreecam = true;
    global.gameplayCam = mp.cameras.new("gameplay");

    mp.events.add("render", () => {
        let controls = mp.game.controls;
        let fly = global.fly;
        const direction = global.gameplayCam.getDirection();

        if (controls.isControlJustPressed(0, controlsIds.F5) && global.canExitFreecam) {
            fly.flying = !fly.flying;

            const player = mp.players.local;

            player.setInvincible(fly.flying);
            player.freezePosition(fly.flying);
            player.setAlpha(fly.flying ? 0 : 255);
            mp.nametags.enabled = !fly.flying;
            mp.game.ui.displayRadar(!fly.flying);

            if (!fly.flying
                && !controls.isControlPressed(0, controlsIds.Shift)) {
                let position = mp.players.local.position;
                position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
                mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
            }

            mp.game.graphics.notify(fly.flying ? "Fly: ~g~Enabled" : "Fly: ~r~Disabled");
            if (fly.flying) {
                mp.game.graphics.notify("~g~Fly script loaded!");
                mp.game.graphics.notify("~g~F5~w~ - enable/disable\n~g~F5+Shift~w~ - disable without warping to ground\n");
                mp.game.graphics.notify('~g~E~w~ - script cameras');
            }
        }
        else if (fly.flying) {
            let updated = false;
            let position = mp.players.local.position;
            let isSlow = controls.isControlPressed(0, controlsIds.LAlt);

            if (controls.isControlPressed(0, controlsIds.W)) {
                if (isSlow) {
                    fly.f = 0.1;
                } else if (fly.f < fly.maxSpeed) {
                    fly.f *= 1.025;
                }

                position.x += direction.x * fly.f;
                position.y += direction.y * fly.f;
                position.z += direction.z * fly.f;
                updated = true;
            }
            else if (controls.isControlPressed(0, controlsIds.S)) {
                if (isSlow) {
                    fly.f = 0.1;
                } else if (fly.f < fly.maxSpeed) {
                    fly.f *= 1.025;
                }

                position.x -= direction.x * fly.f;
                position.y -= direction.y * fly.f;
                position.z -= direction.z * fly.f;
                updated = true;
            }
            else {
                fly.f = fly.df;
            }

            if (controls.isControlPressed(0, controlsIds.A)) {
                if (isSlow) {
                    fly.l = 0.1;
                } else if (fly.l < fly.maxSpeed) {
                    fly.l *= 1.025;
                }

                position.x += (-direction.y) * fly.l;
                position.y += direction.x * fly.l;
                updated = true;
            }
            else if (controls.isControlPressed(0, controlsIds.D)) {
                if (isSlow) {
                    fly.l = 0.1;
                } else if (fly.l < fly.maxSpeed) {
                    fly.l *= 1.025;
                }

                position.x -= (-direction.y) * fly.l;
                position.y -= direction.x * fly.l;
                updated = true;
            }
            else {
                fly.l = fly.dl;
            }

            if (controls.isControlPressed(0, controlsIds.Shift)) {
                if (isSlow) {
                    fly.h = 0.1;
                } else if (fly.h < fly.maxSpeed) {
                    fly.h *= 1.025;
                }

                position.z += fly.h;
                updated = true;
            }
            else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
                if (isSlow) {
                    fly.h = 0.1;
                } else if (fly.h < fly.maxSpeed) {
                    fly.h *= 1.025;
                }

                position.z -= fly.h;
                updated = true;
            }
            else {
                fly.h = fly.dh;
            }

            if (updated) {
                mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
            }
        }
    });
};