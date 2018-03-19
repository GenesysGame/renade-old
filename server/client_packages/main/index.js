// Main module main file

let loadingWindow = require('main/views/loadingWindow');
let loginWindow = require('main/views/loginWindow');
let registerWindow = require('main/views/registerWindow');

// MARK: - Events

mp.events.add('player:spawn', () => {
    mp.game.graphics.notify('~g~Welcome back, ~s~' + mp.players.local.name + '!');
    showWindow(null, false);
});

mp.events.add('player:spawn-new', () => {
    mp.game.graphics.notify('~g~Welcome, ~s~' + mp.players.local.name + '!');
    showWindow(null, false);
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
