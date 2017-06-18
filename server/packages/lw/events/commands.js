var weapons = require("./weapons");

let male = 1885233650;
let female = -1667301416;

var supportedWeapons = {
    "pistol": weapons.WEAPON_PISTOL,
    "smg": weapons.WEAPON_SMG,
    "rifle": weapons.WEAPON_ASSAULTRIFLE,
    "sniper": weapons.WEAPON_SNIPERRIFLE,
    "shotgun": weapons.WEAPON_ASSAULTSHOTGUN
};

module.exports = {

    handle: function (player, command, args) {
        var handler = registered[command];
        if (handler != null) {
            handler(player, args);
        }
    }

};

var registered = {
    "pos": (player, args) => {
        var pos = player.position;
        var x = Math.round(pos.x * 1000) / 1000;
        var y = Math.round(pos.y * 1000) / 1000;
        var z = Math.round(pos.z * 1000) / 1000;
        player.outputChatBox("Your position ->  X: " + x + ", Y: " + y + ", Z: " + z);
    },

    "veh": (player, args) => {
        var modelName = args[0];
        if (modelName == null) { return; }
        var hash = mp.joaat(modelName);
        var pos = player.position;
        pos.x = pos.x + 10;
        pos.z = pos.z + 2;
        mp.vehicles.new(hash, pos);
    },

    "weapon": (player, args) => {
        var modelName = args[0];
        if (modelName == null) { return; }
        var hash = supportedWeapons[modelName];
        if (hash == null) { return; }
        player.giveWeapon(hash, 1000);
    },

    "cl": (player, args) => {
        var component = parseInt(args[0]);
        if (component == null || isNaN(component)) {
            component = 0;
        }
        var id = parseInt(args[1]);
        if (id == null || isNaN(id)) {
            id = lastId + 1;
        }
        lastId = id;
        var tex = parseInt(args[2]);
        if (tex == null || isNaN(tex)) {
            tex = 0;
        }
        var pal = parseInt(args[3]);
        if (pal == null || isNaN(pal)) {
            pal = 0;
        }
        player.setClothes(component, id, tex, pal);
        let string = "Set " + component + " to " + id + ", texture " + tex + "palete " + pal;
        console.log(string);
        player.outputChatBox(string);
    },

    "pr": (player, args) => {
        var prop = parseInt(args[0]);
        if (prop == null || isNaN(prop)) {
            prop = 0;
        }
        var id = parseInt(args[1]);
        if (id == null || isNaN(id)) {
            id = lastPropId + 1;
        }
        lastPropId = id;
        var tex = parseInt(args[2]);
        if (tex == null || isNaN(tex)) {
            tex = 0;
        }
        player.setProp(prop, id, tex);
        let string = "Set prop " + prop + " to " + id + ", texture " + tex;
        console.log(string);
        player.outputChatBox(string);
    },

    "sex": (player, args) => {
        var sex = parseInt(args[0]);
        if (sex == null || isNaN(sex)) {
            sex = 0;
        }
        if (sex == 0) {
            player.model = male;
        } else {
            player.model = female;
        }
    },

    "police": (player, args) => {
        if (player.model == male) {
            var set = parseInt(args[0]);
            if (set == null || isNaN(set)) {
                set = 0;
            }
            setPoliceClothesSet(player, set);
            let string = "Plice set " + set + " (male)";
            console.log(string);
            player.outputChatBox(string);
        } else {
            // TODO
        }
    },

    "swat": (player, args) => {
        if (player.model == male) {
            var set = parseInt(args[0]);
            if (set == null || isNaN(set)) {
                set = 0;
            }
            setSwatClothesSet(player, set);
            let string = "SWAT set " + set + " (male)";
            console.log(string);
            player.outputChatBox(string);
        } else {
            // TODO
        }
    }
}

var lastPropId = 0;
var lastId = 0;

function setPoliceClothesSet(player, set) {
    var torso = [0, 0];
    var torsoAcc = [15, 0];
    var legs = [0, 0];
    var foot = [0, 0];
    var helmet = [0, 0];
    var hands = [0, 0];
    var mask = [0, 0];

    switch (set) {
        case 0:
            torso = [55, 0];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            hands = [52, 0];
            break;
        case 1:
            torso = [13, 2];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            hands = [11, 0];
            break;
        case 2:
            torso = [55, 0];
            torsoAcc = [58, 0];
            legs = [35, 0];
            foot = [21, 0];
            break;
        case 3:
            torso = [26, 0];
            torsoAcc = [58, 0];
            legs = [35, 0];
            foot = [21, 0];
            hands = [11, 0];
            break;
        case 4:
            torso = [13, 0];
            torsoAcc = [58, 0];
            legs = [3, 0];
            foot = [21, 0];
            hands = [11, 0];
            break;
        case 5:
            torso = [26, 2];
            torsoAcc = [58, 0];
            legs = [3, 10];
            foot = [21, 0];
            hands = [11, 0];
            break;
        case 6:
            torso = [55, 0];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            helmet = [6, 1];
            break;
        case 7:
            torso = [55, 0];
            torsoAcc = [15, 0];
            legs = [33, 0];
            foot = [25, 0];
            helmet = [15, 2];
            mask = [46, 0];
            break;
        case 8:
            torso = [50, 0];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            hands = [1, 0];
            break;
        case 9:
            torso = [111, 3];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            hands = [4, 0];
            break;
        default: break;
    }

    setClothes(player, torso, torsoAcc, legs, foot, hands, helmet, mask);
}

function setSwatClothesSet(player, set) {
    var torso = [0, 0];
    var torsoAcc = [15, 0];
    var legs = [0, 0];
    var foot = [0, 0];
    var helmet = [0, 0];
    var hands = [4, 0];
    var mask = [0, 0];

    switch (set) {
        case 0:
            torso = [49, 0];
            torsoAcc = [56, 1];
            legs = [33, 0];
            foot = [25, 0];
            mask = [52, 0];
            break;
        case 1:
            torso = [49, 0];
            legs = [34, 0];
            foot = [25, 0];
            mask = [52, 0];
            helmet = [16, 2];
            break;
        case 2:
            torso = [53, 0];
            torsoAcc = [58, 0];
            legs = [33, 0];
            foot = [25, 0];
            break;
        case 3:
            torso = [49, 0];
            legs = [33, 0];
            foot = [25, 0];
            mask = [52, 0];
            break;
        default: break;
    }

    setClothes(player, torso, torsoAcc, legs, foot, hands, helmet, mask);
}

function setClothes(player, torso, torsoAcc, legs, foot, hands, helmet, mask) {
    player.setClothes(11, torso[0], torso[1], 0);
    player.setClothes(4, legs[0], legs[1], 0);
    player.setClothes(6, foot[0], foot[1], 0);
    player.setClothes(8, torsoAcc[0], torsoAcc[1], 0);
    player.setClothes(3, hands[0], hands[1], 0);
    player.setClothes(9, helmet[0], helmet[1], 0);
    player.setClothes(1, mask[0], mask[1], 0);
}