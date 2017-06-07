function playerJoinHandler(player) {
    console.log(player.name + " joined the server. Total: " + mp.players.length);
}

function playerQuitHandler(player, exitType, reason) {
    if (exitType != "kicked") {
        var str = player.name + " left the server (" + exitType + "). Total: " + mp.players.length - 1;
    } else {
        var str = player.name + " kicked. Reason: " + reason + ". Total: " + mp.players.length - 1;
    }
    console.log(str);
}

mp.events.add("playerJoin", playerJoinHandler);
mp.events.add("playerQuit", playerQuitHandler);