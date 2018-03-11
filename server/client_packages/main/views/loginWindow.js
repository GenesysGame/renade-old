// Login window client handler

let windows = require('main/views/windows');

let loginWindow = mp.browsers.new('package://main/web/login.html');
exports = loginWindow;

mp.events.add('loginWindow:show', () => {
    windows.show(loginWindow, true);
});

mp.events.add('loginWindow:login', (username, password) => {
    mp.events.callRemote('account:login', username, password);
});

mp.events.add('loginWindow:register', () => {
    mp.events.call('registerWindow:show');
});

mp.events.add('loginWindow:stopLoading', (error) => {
    if (error) {
        mp.game.graphics.notify('~r~Login error: ~s~' + error);
    }
    loginWindow.execute('stopLoading();');
})

