// Renade RP. GGame Studio. 28.10.2017
// Development tool for code testing

let keyboard = require('keyboard.js');

let devtoolWindow = {
    browser: mp.browsers.new('package://devtool/web/index.html'),
    key: 117 // F6
}
devtoolWindow.browser.active = false;
keyboard.bindWindow(devtoolWindow);

mp.events.add('devtool:run', function (code) {
    var result;
    try {
        result = eval(code);
    } catch (e) {
        result = e.message;
    }
    devtoolWindow.browser.execute(`output('${result}');`);
});