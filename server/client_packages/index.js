// Renade RP. GGame Studio. 1.10.2017
// Base client file which contains all client packages
let peds = require('./peds.js');
let animlist = require('./animlist/animlist.js');
let camtool = require('./camtool/camtool.js');
let guntool = require('./guntool/guntool.js');
let devtool = require('./devtool/devtool.js');
let clothes = require('./clothes/clothes.js');

mp.events.add('player:createPed', () => {
    peds.createPed(mp.players.local);
});