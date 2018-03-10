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
    showWindow(null);
});

function showWindow(window) {
    mp.browsers.forEach(browser => {
        browser.visible = false;
    });

    mp.gui.chat.show(false);
    mp.gui.cursor.visible = true;
    mp.game.ui.displayRadar(false);
    mp.players.local.freezePosition(true);

    loginCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    window.visible = true;
}

// MARK: - Exports

exports.showLoginWindow = function () {
    showWindow(loginWindow);
};