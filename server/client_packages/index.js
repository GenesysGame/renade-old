// Renade RP. GGame Studio. 1.10.2017
// Base client file which contains all client packages

// Beta part

let peds = require('./peds.js');
let animlist = require('./animlist/animlist.js');
let camtool = require('./camtool/camtool.js');
let guntool = require('./guntool/guntool.js');
let devtool = require('./devtool/devtool.js');

mp.events.add('player:createPed', () => {
    peds.createPed(mp.players.local);
});

// General part

const main = require('./main');

mp.events.add('player:showLoginWindow', () => {
    main.showLoginWindow();
});