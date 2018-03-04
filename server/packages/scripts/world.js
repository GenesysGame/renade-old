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
    player.model = 1885233650;
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
