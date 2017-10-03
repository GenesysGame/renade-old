/*
Tutorial of mp object

mp {
    .version {
        core
        net
    }
    .events {
        add
        call
        callRemote
    }
    .Browser
    .Marker
    .Camera
    .Checkpoint
    .Colshape
    .Pickup
    .Object
    .Blip
    .Player
    .Ped
    .Vehicle
    .browsers: Array<Browser?>
    .markers: Array<Marker?>
    .cameras: Array<Camera?>
    .checkpoints: Array<Checkpoint?>
    .colshapes: Array<Colshape?>
    .pickups: Array<Pickup?>
    .objects: Array<Object?>
    .blips: Array<Blip?>
    .players: Array<Player?>
    .vehicles: Array<Vehicle?>
    .storage {
        __flush
        flush
        data
    }
    .gui {
        execute
        chat
        .cursor: Array<Int> // [x, y]
    }
    .game {
        app
        audio
        brain
        cam
        controls
        cutscene
        datafile
        decisionevent
        decorator
        dlc1
        dlc2
        entity
        fire
        gameplay
        .graphics {
            getScreenResolution(x: Int, y: Int) -> {x: Int, y: Int} // params (0, 0)
        }
        interior
        itemset
        mobile
        object
        pathfind
        ped
        player
        rope
        script
        stats
        streaming
        system
        time
        ui
        unk
        recorder
        vehicle
        water
        weapon
        zone
        invoke
        wait
        joaat
    }
    .keys {
        bind
        unbind
        isDown
        isUp
    }
    .nametags {
        update
        enabled
        set
    }
    .raycasting {
        testPointToPoint
        testCapsule
    }
    .Vector3
}

*/