let peds = require('./peds.js');

mp.events.add('player:createPed', () => {
    peds.createPed(mp.players.local);
});