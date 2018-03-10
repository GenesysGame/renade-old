// Main script for Renade RP

const API = require('./api');

const Account = require('./model/account');
const Character = require('./model/character');

const Dimension = {
    unauthorized: 0,
    general: 1
}

mp.events.add('playerJoin', function(player) {
    console.log(player.name + " joined the server. Total: " + mp.players.length);

    // TODO: - Check if the player is already authorized
    player.dimension = Dimension.unauthorized;
    player.alpha = 0;
    player.call('player:showLoginWindow');
});
