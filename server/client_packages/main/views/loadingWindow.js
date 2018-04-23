// Loading window client handler

let windows = require('main/views/windows');

let loadingWindow = mp.browsers.new('package://main/web/loading.html');
exports = loadingWindow;

mp.events.add('loadingWindow:show', () => {
    windows.show(loadingWindow, true);
});
