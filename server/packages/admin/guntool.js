// Renade RP. GGame Studio. 1.10.2017
// Server part of guntool package

mp.events.add('guntool:giveWeapon', function (player, hash) {
    let intHash = parseInt(hash);
    player.giveWeapon(intHash, 1000);
});

mp.events.add('guntool:mods:getWeapon', function (player) {
    player.call('guntool:mods:weaponReceived', player.weapon);
});
