// Main module main file

let loadingWindow = require('main/views/loadingWindow');
let loginWindow = require('main/views/loginWindow');
let registerWindow = require('main/views/registerWindow');

// MARK: - Events

mp.events.add('player:spawn', () => {
    let player = mp.players.local;
    mp.game.graphics.notify('~g~Welcome back, ~s~' + player.name + '!');
    showWindow(null, false);
    player.setAlpha(255);
});

mp.events.add('player:spawn-new', () => {
    let player = mp.players.local;
    mp.game.graphics.notify('~g~Welcome, ~s~' + player.name + '!');
    showWindow(null, false);
    player.setAlpha(255);
});

// MARK: - Exports

exports.showLoadingWindow = function () {
    showWindow(loadingWindow, true);
}

exports.showLoginWindow = function () {
    showWindow(loginWindow, true);
    let name = mp.players.local.name;
    loginWindow.execute(`fillUsername('${name}');`);
    registerWindow.execute(`fillUsername('${name}');`)
};
