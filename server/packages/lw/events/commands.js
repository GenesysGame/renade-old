var weapons = require("./weapons");

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
    }
}

var lastPropId = 0;
var lastId = 0;