/**
 * survivalRoomManager
 */
var survivalRoomManager = {

    getSpawns: function (room) {
        return room.find(Game.FIND_SOURCES);
    },

    getSpawn: function (room) {
        var spawns = this.getSpawns(room);

        if (spawns.length > 0) {
            return spawns[0];
        }

        return null;
    },

    getExits: function (room) {
        var exits = new Array();

        var exit = null;

        exit = room.find(Game.EXIT_TOP);
        if (exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_BOTTOM);
        if (exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_LEFT);
        if (exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_RIGHT);
        if (exit.length > 0) {
            exits.push(exit[0]);
        }

        return exits;
    },

    createSpawn: function (room) {
        var pathLength = null;
        var paths = null;
        var source = null;
        var destination = null;

        // determine shortest route between 2 sources
        // @todo: determine fastest route
        var sources = this.getSpawns(room);
        for (var s in sources) {
            var testSource = sources[s];
            var destinations = spawn.room.find(Game.FIND_SOURCES, {
                filter: function (object) {
                    return object.id !== testSource.id;
                }
            });

            for (var d in destinations) {
                var testDestination = destinations[d];
                var testPaths = testSource.pos.findPathTo(testDestination);

                if (paths === null || testPaths.length < paths.length) {
                    paths = testPaths;
                    source = testSource;
                    destination = testDestination;
                }
            }
        }

        if (paths !== null) {
            // create spawn on 1/3 of the route starting from source furthest away from the exit
            //todo: determine the point most away from an exit
            var spawnPosIndex = paths.length / 3;

            var pos = paths[spawnPosIndex];

            console.log('survivalRoomManager: Creating constructionSite at ' + pos.x + ':' + pos.y);

            if (room.createConstructionSite(pos.x, pos.y, Game.STRUCTURE_SPAWN) == Game.OK) {
                return true;
            }
        }
        return false;
    },

    initialise: function (room) {
        if (room.memory.initialised) {
            return true;
        }

        if (this.getSpawn(room) !== null || this.createSpawn(room)) {
            room.memory.initialised = true;
        } else {
            console.log('survivalRoomManager: failed to create spawn point.');
        }
    }

};

module.exports = survivalRoomManager;