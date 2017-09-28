
exports.createPed = createPed;

function createPed(player) {
    var pos = player.position;
    pos.x = pos.x + 1;
    let model = mp.game.joaat('S_M_M_Postal_01');
    mp.game.brain.addScriptToRandomPed("pb_homeless", model, 100, 0);

    let ped = mp.peds.new(model, pos, 270.0, (streamPed) => {
        streamPed.setDynamic(true);
        let pattern = mp.game.joaat('FIRING_PATTERN_BURST_FIRE_RIFLE');
        streamPed.setFiringPattern(pattern);
    }, player.dimension);
    ped.setCanBeDamaged(true);
}