// Rize RP. GGame Studio. 2.10.2017
// Custom events handlers. Server file

let animatePlayer = (player, animName, animProperty) => {
    if (animName == '' || animProperty == '') {
        player.stopAnimation();
    } else {
        player.playAnimation(animName, animProperty, 1, 49);
    }
};

mp.events.add("player:animate", animatePlayer);