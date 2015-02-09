/**
 * builder
 */
module.exports = function (creep) {
    var spawn = Game.spawns.Spawn1;
 
 
	var targets = creep.room.find(Game.CONSTRUCTION_SITES);
	if(targets.length > 0) {
     	if(creep.energy === 0) {
    		creep.memory.action = 'On route to collect energy from ' + spawn.name;
    		creep.moveTo(spawn);
    		spawn.transferEnergy(creep);
    	} else {
		    creep.memory.action = 'Building ' + targets[0].name;
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
    	}
	} else if (!creep.pos.inRangeTo(spawn, 10)) {
		creep.memory.action = 'Returning to ' + spawn.name;
		creep.moveTo(spawn);
    } else if (creep.pos.inRangeTo(spawn, 5)) {
		creep.memory.action = 'Create distance from spawn ' + spawn.name;
		creep.moveTo(25, 25);
	} else {
	    creep.memory.action = 'Waiting for work';
	}
}