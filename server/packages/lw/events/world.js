var db = require("./db");
var commands = require("./commands");

function playerJoinHandler(player) {
    console.log(player.name + " joined the server. Total: " + mp.players.length);

    player.spawn(new mp.Vector3(-269.2, 6644, 7.4));
}

function playerQuitHandler(player, exitType, reason) {
    if (exitType != "kicked") {
        var str = player.name + " left the server (" + exitType + "). Total: " + (mp.players.length - 1);
    } else {
        var str = player.name + " kicked. Reason: " + reason + ". Total: " + (mp.players.length - 1);
    }
    console.log(str);
}

function playerSpawned(player) {
    player.model = mp.joaat("MP_M_Freemode_01");

    let hairId = Math.round(Math.random() * 13);
    var color = Math.round(Math.random() * 5);
    console.log(player.name + " -> Hair: " + hairId, "Color: " + color);
    player.setClothes(2, hairId, color, 0);

    let torsoId = Math.round(Math.random() * 50);
    console.log(player.name + " -> Torso: " + torsoId);
    player.setClothes(3, 0, 0, 0);
    player.setClothes(11, torsoId, 0, 0);

    let legsId = Math.round(Math.random() * 77);
    console.log(player.name + " -> Legs: " + legsId);
    player.setClothes(4, legsId, 0, 0);

    let feetId = Math.round(Math.random() * 58);
    console.log(player.name + " -> Feet: " + feetId);
    player.setClothes(6, feetId, 0, 0);
}

function commandHandler(player, comText) {
    var arr = comText.split(" ");
    var cmd = arr[0];
    arr.shift();
    commands.handle(player, cmd, arr);
}

mp.events.add({
    "playerJoin": playerJoinHandler,
    "playerQuit": playerQuitHandler,
    "playerSpawn": playerSpawned,
    "playerCommand": commandHandler
});