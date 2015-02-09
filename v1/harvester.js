/**
 * harvester
 */
module.exports = function (creep) {
    var targets = creep.room.find(Game.SOURCES);
    var spawn = Game.spawns.Spawn1;

    if(targets.length > 0) {
    	if(creep.energy < creep.energyCapacity) {
    		creep.memory.action = 'Harvesting ' + targets[0].id;
    		creep.moveTo(targets[0]);
    		creep.harvest(targets[0]);
    	} else {
    		creep.memory.action = 'On route to delivery energy to ' + spawn.name;
    		creep.moveTo(spawn);
    		creep.transferEnergy(spawn);
    	}
    } else if (!creep.pos.inRangeTo(spawn, 10)) {
		creep.memory.action = 'Returning to ' + spawn.name;
		creep.moveTo(spawn);
    } else if (creep.pos.inRangeTo(spawn, 5)) {
		creep.memory.action = 'Create distance from spawn ' + spawn.name;
		creep.moveTo(25, 25);
	} else {
		creep.memory.action = 'Waiting for sources';
	}
}