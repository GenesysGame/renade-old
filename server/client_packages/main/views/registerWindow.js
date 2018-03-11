// Register window client handler

let windows = require('main/views/windows');

let registerWindow = mp.browsers.new('package://main/web/register.html');
exports = registerWindow;

mp.events.add('registerWindow:show', () => {
    windows.show(registerWindow, true);
})

mp.events.add('registerWindow:register', (username, password, repeat, email) => {
    if (!username || username.length <= 0) {
        windows.notify('~r~Registration error: ~s~Username cannot be empty');
        return;
    }
    if (!password || password.length < 4) {
        windows.notify('~r~Registration error: ~s~Password cannot be less than 4 symbols');
        return;
    }
    if (repeat != password) {
        windows.notify('~r~Registration error: ~s~ Passwords are not equal');
        return;
    }
    if (!email || email.length <= 0) {
        windows.notify('~r~Registration error: ~s~E-mail cannot be empty');
        return;
    }
    registerWindow.execute('startLoading();');
    mp.events.callRemote('account:register', username, password, email);
});

mp.events.add('registerWindow:login', () => {
    mp.events.call('loginWindow:show');
});

mp.events.add('registerWindow:stopLoading', (error) => {
    if (error) {
        windows.notify('~r~Registration error: ~s~' + error);
    }
    registerWindow.execute('stopLoading();');
})