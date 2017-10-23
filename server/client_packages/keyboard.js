// Renade RP. GGame Studio. 1.10.2017
// Keyboard controller for all client packages.
// It means every client package which wants to use keyboard, mouse 
// or gamepad should be connected with this file.

exports.bindWindow = bindWindow;
exports.bindAction = bindAction;

function bindWindow(window, condition) {
    mp.keys.bind(window.key, true, function () {
        if (condition && !condition()) return;
        let visible = !window.browser.active;
        window.browser.active = visible;
        mp.gui.cursor.visible = visible;
    });
}

function bindAction(action) {
    mp.keys.bind(action.key, true, function () {
        action.run();
    });
}
