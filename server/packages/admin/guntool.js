// Renade RP. GGame Studio. 1.10.2017
// Server part of guntool package

mp.events.add('guntool:giveWeapon', function (player, hash) {
    let intHash = parseInt(hash);
    console.log('hash ' + intHash + ' ' + typeof (intHash));
    player.giveWeapon(intHash, 1000);
});
