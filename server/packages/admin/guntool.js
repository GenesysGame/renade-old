// Renade RP. GGame Studio. 1.10.2017
// Server part of guntool package

mp.events.add('guntool:giveWeapon', function (player, hash, ammo) {
    let intHash = parseInt(hash);
    let intAmmo = parseInt(ammo);
    player.giveWeapon(intHash, intAmmo);
});

mp.events.add('guntool:mods:getWeapon', function (player) {
    player.call('guntool:mods:weaponReceived', player.weapon);
});
