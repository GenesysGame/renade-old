// Renade RP. GGame Studio. 1.10.2017
// Animations list client package

let keyboard = require('keyboard.js');

let testWindow = {
    browser: mp.browsers.new('package://clothes/web/index.html'),
    key: 115 // F4
}
testWindow.browser.active = false;

keyboard.bindWindow(testWindow);

mp.events.add("clothes:clothesSelected", function (torso_draw, torso_tex, torso_acc_draw, torso_acc_tex, legs_draw, legs_tex, foot_draw, foot_tex, hands_draw, hands_tex, helmet_draw, helmet_tex, mask_draw, mask_tex) {
    mp.events.callRemote("player:dress", torso_draw, torso_tex, torso_acc_draw, torso_acc_tex, legs_draw, legs_tex, foot_draw, foot_tex, hands_draw, hands_tex, helmet_draw, helmet_tex, mask_draw, mask_tex);
});

mp.events.add("clothes:clothesCreated", function () {
	mp.events.callRemote("player:create");
});

mp.events.add("clothes:clothesSaved", function (torso_draw, torso_tex, torso_acc_draw, torso_acc_draw_tex, legs_draw, legs_tex, foot_draw, foot_tex, hands_draw, hands_tex, helmet_draw, helmet_tex, mask_draw, mask_tex){
	var result = "['"+torso_draw+"', '"+torso_tex+"', '"+torso_acc_draw+"', '"+torso_acc_draw_tex+"', '"+legs_draw+"', '"+legs_tex+"', '"+foot_draw+"', '"+foot_tex+"', '"+hands_draw+"', '"+hands_tex+"', '"+helmet_draw+"', '"+helmet_tex+"', '"+mask_draw+"', '"+mask_tex+"']";
	testWindow.browser.execute('create('+result+');');
});