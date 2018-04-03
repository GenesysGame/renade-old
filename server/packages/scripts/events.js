// Renade RP. GGame Studio. 2.10.2017
// Custom events handlers. Server file

let animatePlayer = (player, animName, animProperty) => {
    if (animName == '' || animProperty == '') {
        player.stopAnimation();
    } else {
        player.playAnimation(animName, animProperty, 1, 49);
    }
};

let playerDress = (player, torso_draw, torso_tex, torso_acc_draw, torso_acc_draw_tex, legs_draw, legs_tex, foot_draw, foot_tex, hands_draw, hands_tex, helmet_draw, helmet_tex, mask_draw, mask_tex) => {
    player.setClothes(11, parseInt(torso_draw), parseInt(torso_tex), 2);
    player.setClothes(8, parseInt(torso_acc_draw), parseInt(torso_acc_draw_tex), 2);
    player.setClothes(4, parseInt(legs_draw), parseInt(legs_tex), 2);
    player.setClothes(6, parseInt(foot_draw), parseInt(foot_tex), 2);
    player.setClothes(3, parseInt(hands_draw), parseInt(hands_tex), 2);
    player.setClothes(9, parseInt(helmet_draw), parseInt(helmet_tex), 2);
    player.setClothes(1, parseInt(mask_draw), parseInt(mask_tex), 2);
};

let playerCreate = (player) => {
	player.call('clothes:clothesSaved',[
		player.getClothes(11).drawable, player.getClothes(11).texture,
		player.getClothes(8).drawable, player.getClothes(8).texture,
		player.getClothes(4).drawable, player.getClothes(4).texture,
		player.getClothes(6).drawable, player.getClothes(6).texture,
		player.getClothes(3).drawable, player.getClothes(3).texture,
		player.getClothes(9).drawable, player.getClothes(9).texture,
		player.getClothes(1).drawable, player.getClothes(1).texture,
	]);
};

mp.events.add("player:animate", animatePlayer);
mp.events.add("player:dress", playerDress);
mp.events.add("player:create", playerCreate);