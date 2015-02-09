/**
 * medic
 */
module.exports = function (creep) {
	var spawn = Game.spawns.Spawn1;
	var target = creep.pos.findClosest(Game.MY_CREEPS, {
		filter: function(object) {
			return object.hits < object.hitsMax;
		}
	});

	if(target !== null) {
		creep.moveTo(target);
		if(creep.pos.isNearTo(target)) {
			creep.heal(target);
		}	else {
			creep.rangedHeal(target);
		}
    } else if (!creep.pos.inRangeTo(spawn, 6)) {
		creep.memory.action = 'Returning to ' + spawn.name;
		creep.moveTo(spawn);
    } else if (creep.pos.inRangeTo(spawn, 5)) {
		creep.memory.action = 'Create distance from spawn ' + spawn.name;
		creep.moveTo(25, 25);
	} else {
		creep.memory.action = 'Waiting for injured creeps';
	}
}