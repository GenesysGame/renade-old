// Rize RP. GGame Studio. 1.10.2017
// Base client file which contains all client packages

let peds = require('./peds.js');
let animlist = require('./web/animlist/animlist.js');
let camtool = require('./web/camtool/camtool.js');
let testcam = require('./web/testcam/index.js')

mp.events.add('player:createPed', () => {
    peds.createPed(mp.players.local);
});