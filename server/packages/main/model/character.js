// Character data model

class Character {

    constructor(json) {
        this.firstname = json.firstname;
        this.lastname = json.lastname;
        this.male = json.male;
    }

    static config(player) {
        player.model = 1885233650;//-1667301416;
        var bGender = true;
        if(player.model != 1885233650) {
	        bGender = false;
        }

        var MotherBlend = 21, FatherBlend = 41, fBlendShape = 0.5, fBlendSkin = 0.5, HairHighlight = 0, HairColour = 10;

        var NoseWidth = 0, NoseHeight = 0, NoseLength = 0, NoseBridge = 0, NoseTip = 0, NoseBridgeShift = 0;
        var BrowHeight = 0, BrowWidth = 0, CBoneHeight = 0, CBoneWidth = 0, CheekWidth = 0, Eyes = 0, Lips;
        var JawWidth = 0, ChinLength = 0, ChinPos = 0, ChinWidth = 0, ChinShape = 0, NeckWidth = 0;

        player.setCustomization(bGender, MotherBlend, FatherBlend, 0, MotherBlend, FatherBlend, 0, fBlendShape, fBlendSkin, 0, 1, HairColour, HairHighlight, 
	        [
		        NoseWidth, NoseHeight, NoseLength, NoseBridge, NoseTip, NoseBridgeShift, 
		        BrowHeight, BrowWidth, CBoneHeight, CBoneWidth, CheekWidth, Eyes, Lips,
		        JawWidth, ChinLength, ChinPos, ChinWidth, ChinShape, NeckWidth
	        ]
        );
        console.log('Customization completed');
        player.setClothes(2, 10, 0, 0);
    }

}
module.exports = Character;

mp.events.add('player:config', (player, sex, motherBlend, fatherBlend, blendShape, blendSkin) => {
    console.log('TEST: ' + player.name + ': ' + motherBlend, + ' ' + fatherBlend + ' ' + blendShape + ' ' + blendSkin);
});
