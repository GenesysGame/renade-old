var commands = require("./commands");

function playerQuitHandler(player, exitType, reason) {
    if (exitType != "kicked") {
        var str = player.name + " left the server (" + exitType + "). Total: " + (mp.players.length - 1);
    } else {
        var str = player.name + " kicked. Reason: " + reason + ". Total: " + (mp.players.length - 1);
    }
    console.log(str);
}

function commandHandler(player, comText) {
    var arr = comText.split(" ");
    var cmd = arr[0];
    arr.shift();
    commands.handle(player, cmd, arr);
}

mp.events.add({
    "playerQuit": playerQuitHandler,
    "playerCommand": commandHandler
});
