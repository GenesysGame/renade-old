// Main module main file

// MARK: - Login window

let loginCamPos = new mp.Vector3(166, 6866, 197);
let loginCamRot = new mp.Vector3(-10, 0, 180);
let loginCamera = mp.cameras.new('default', loginCamPos, loginCamRot, 60);
let loginWindow = mp.browsers.new('package://main/web/login.html');

mp.events.add('loginWindow:login', (username, password) => {
    mp.events.callRemote('account:login', username, password);
});

mp.events.add('loginWindow:register', () => {
    showWindow(null, false);
});

mp.events.add('loginWindow:stopLoading', (error) => {
    mp.game.graphics.notify('test message. Error is the message with text: ' + error.data);

    if (error) {
        mp.game.graphics.notify(error);
    }
    loginWindow.execute('stopLoading();');
})

function showWindow(window, isLogin) {
    let show = window != null;
    mp.browsers.forEach(browser => {
        browser.active = false;
    });

    mp.gui.chat.show(!show);
    mp.gui.cursor.visible = show;
    mp.game.ui.displayRadar(!show);

    mp.players.local.freezePosition(isLogin);
    loginCamera.setActive(isLogin);
    mp.game.cam.renderScriptCams(isLogin, false, 0, true, false);
    
    if (window) {
        window.active = true;
    }
}

// MARK: - Events

mp.events.add('player:spawn', () => {
    showWindow(null, false);
});

// MARK: - Exports

exports.showLoginWindow = function () {
    showWindow(loginWindow, true);
    let name = mp.players.local.name;
    loginWindow.execute(`fillUsername('${name}');`);
};