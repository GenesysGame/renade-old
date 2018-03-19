// Main script for Renade RP

const API = require('./api');

const Account = require('./model/account');
const Character = require('./model/character');

const Dimension = {
    unauthorized: 1,
    general: 0
}

mp.events.add('playerJoin', function(player) {
    console.log(player.name + " joined the server. Total: " + mp.players.length);

    player.dimension = Dimension.unauthorized;
    player.position = new mp.Vector3(166, 6866, 197);
    player.alpha = 0;

    player.call('player:showLoadingWindow');
    Account.fastLogin(player.name, (account, error) => {
        if (account) {
            player.setVariable('model', account.json());
            mp.events.call('playerLogin', player);
        } else {
            player.call('player:showLoginWindow');
        }
    });
});

mp.events.add('playerLogin', function(player) {
    playerAuthorized(player, false);
});

mp.events.add('playerRegister', function(player) {
    playerAuthorized(player, true);
});

function playerAuthorized(player, isJustRegistered) {
    let model = player.getVariable('model');
    console.log(player.name + " authorized as " + model.username);
    player.name = model.username;

    player.dimension = Dimension.general;
    player.alpha = 1;
    player.spawn(new mp.Vector3(-269.2, 6644, 7.4));

    if (isJustRegistered) {
        player.call('player:spawn-new');
    } else {
        player.call('player:spawn');
    }
}
