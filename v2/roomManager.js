/**
 * survivalRoomManager
 */
var survivalRoomManager = {

    getExits: function(room) {
        var exits = new Array();

        var exit = null;

        exit = room.find(Game.EXIT_TOP);
        if(exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_BOTTOM);
        if(exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_LEFT);
        if(exit.length > 0) {
            exits.push(exit[0]);
        }

        exit = room.find(Game.EXIT_RIGHT);
        if(exit.length > 0) {
            exits.push(exit[0]);
        }

        return exits;
    },

    createSpawn: function(room) {

        // determine fastest route between 2 sources
        // create spawn on 1/3 of the route starting from source furthest away from the exit

        //room.createConstructionSite(25, 25, Game.STRUCTURE_SPAWN);
    },

    initialise: function(room)
    {
        this.createSpawn(room);

        room.memory.initialised = true;
    }

};

module.exports = survivalRoomManager;