var ipls = require("./ipls");
let events = require('./events');

let male = 1885233650;
let female = -1667301416;

var weathers = [
    'CLEAR',
    'EXTRASUNNY',
    'CLOUDS',
    'OVERCAST',
    'RAIN',
    'CLEARING',
    'THUNDER',
    'SMOG',
    'FOGGY',
    'XMAS',
    'SNOWLIGHT',
    'BLIZZARD',
    'HALLOWEEN'
];

module.exports = {

    handle: function (player, command, args) {
        var handler = registered[command];
        if (handler != null) {
            handler(player, args);
        } else {
            handler = authorization.commands[command];
            if (handler != null) {
                handler(player, args);
            }
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

    "time": (player, args) => {
        var h = parseInt(args[0]);
        if (!h) { h = 12; }
        var m = parseInt(args[1]);
        if (!m) { m = 0; }
        player.outputChatBox("Selected time: " + h + " " + m);
        mp.world.time.set(h, m, 0);
    },

    "weather": (player, args) => {
        var id = parseInt(args[0]);
        if (id == null || isNaN(id)) {
            id = 0;
        }
        if (id >= 0 && id < weathers.length) {
            player.outputChatBox("Selected weather: " + weathers[id]);
            mp.world.weather = weathers[id];
        } else {
            player.outputChatBox("Wheater Id should be 0.." + (weathers.length - 1));
        }
    },

    "veh": (player, args) => {
        var modelName = args[0];
        if (modelName == null) { return; }
        console.log('veh ' + modelName);
        var hash = mp.joaat(modelName);
        var pos = player.position;
        pos.x = pos.x + 10;
        pos.z = pos.z + 2;
        mp.vehicles.new(hash, pos, {
            numberPlate: player.name,
            locked: false,
            engine: false,
            dimension: 0
        });
    },


    "repair": (player, args) => {
        player.vehicle.repair();
    },

    "spawn": (player, args) => {
        player.spawn(new mp.Vector3(-269.2, 6644, 7.4));
    },

    "clean": (player, args) => {
        let vehicle = getClosestVehicle(player, 10);
        if (vehicle != null) {
            vehicle.destroy();
        }
    },

    "ipl": (player, args) => {
        var index = parseInt(args[0]);
        if (index == null || isNaN(index)) {
            index = lastIpl + 1;
        }
        lastIpl = index;
        let ipl = ipls.list[index];

        requestIpl(ipl);

        let string = "IPL " + index + " - " + ipl;
        player.outputChatBox(string);
        console.log(string);
    },

    "iplu": (player, args) => {
        var index = parseInt(args[0]);
        if (index == null || isNaN(index)) {
            index = lastIpl + 1;
        }
        lastIpl = index;
        let ipl = ipls.list[index];
        removeIpl(ipl);

        let string = "IPL removed " + index + " - " + ipl;
        player.outputChatBox(string);
        console.log(string);
    },

    "ipllist": (player, args) => {
        getAcitveIpls(player);
    },

    // clothes

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
        let string = "Set property " + prop + " to " + id + " drawable with texture " + tex;
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
            let string = "Police set " + set + " (male)";
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
    },

    "createPed": (player, args) => {
        player.call('player:createPed');
    },

    "animation": (player, args) => {
        // player.playAnimation('mp_arresting', 'idle', 1, 49)
        let dist = args[0];
        if (dist == "stop") {
            player.stopAnimation();
        } else {
            let anim = args[1];
            let speed = parseInt(args[2]);
            if (speed == null || isNaN(speed)) {
                speed = 1;
            }
            let flag = parseInt(args[3]);
            if (flag == null || isNaN(flag)) {
                flag = 49;
            }
            player.playAnimation(dist, anim, speed, flag);

            let string = "Animation " + dist + " " + anim;
            console.log(string);
            player.outputChatBox(string);
        }
    }
}

var lastPropId = 0;
var lastId = 0;
var lastIpl = 0;

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

function getClosestVehicle(player, maxDistance) {
    let vehicles = mp.vehicles.toArray();
    var minDist = null;
    var minDistVehicle = null;
    var max = maxDistance;
    if (max == null || isNaN(max)) {
        max = Number.POSITIVE_INFINITY;
    }

    for (var i = 0; i < vehicles.length; i++) {
        let aPos = player.position;
        let bPos = vehicles[i].position;

        //AB = √(xb - xa)2 + (yb - ya)2 + (zb - za)2
        let dist = Math.sqrt(Math.pow(bPos.x - aPos.x, 2) + Math.pow(bPos.y - aPos.y, 2) + Math.pow(bPos.z - aPos.z, 2));
        if (dist <= max && (minDist == null || minDist > dist)) {
            minDist = dist;
            minDistVehicle = vehicles[i];
        }
    }

    return minDistVehicle;
}

function getAcitveIpls(player) {
    let IS_IPL_ACTIVE = '0xC5C451876961F4BA';
    player.outputChatBox("ACTIVE IPLS: ");
    for (var i = 0; i < ipls.list.length; i++) {
        let iplName = ipls.list[i];
        let isActive = player.invoke(IS_IPL_ACTIVE, iplName);
        if (isActive) {
            let string = "Active: " + i + " - " + iplName;
            player.outputChatBox(string);
            console.log(player.name + ": " + string);
        }
    }
}

function requestIpl(iplName) {
    let REQUEST_IPL = '0x32EAD4829CDBABEF';

    mp.players.forEach(
        (player, id) => {
            player.invoke(REQUEST_IPL, iplName);
        }
    );
}

function removeIpl(iplName) {
    let REMOVE_IPL = '0x6FE7B9647FC3C004';

    mp.players.forEach(
        (player, id) => {
            player.invoke(REMOVE_IPL, iplName);
        }
    );
}