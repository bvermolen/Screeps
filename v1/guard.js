/**
 * guard
 */
module.exports = function (creep) {
    var targets = creep.room.find(Game.HOSTILE_CREEPS);
    var spawn = Game.spawns.Spawn1;
    
    if(targets.length > 0) {
		creep.memory.action = 'Attacking ' + targets[0].name;
    	creep.moveTo(targets[0]);
		creep.attack(targets[0]);
    } else if (!creep.pos.inRangeTo(spawn, 10)) {
		creep.memory.action = 'Returning to ' + spawn.name;
		creep.moveTo(spawn);
    } else if (creep.pos.inRangeTo(spawn, 5)) {
		creep.memory.action = 'Create distance from spawn ' + spawn.name;
		creep.moveTo(25, 25);
	} else {
		creep.memory.action = 'Waiting for enemies';
	}
}