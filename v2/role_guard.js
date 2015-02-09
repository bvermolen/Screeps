/**
 * guard
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.ATTACK, Game.ATTACK];
		var role = 'guard';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role});
		
		if(_.isString(result)) {
			return true;
		}
		return false;
	},
	
	action: function (creep) {
		var spawn = Game.spawns.Spawn1;
		var targets = creep.room.find(Game.HOSTILE_CREEPS);
		
		if(targets.length > 0) {
			var target = targets[0];
			creep.memory.action = 'Attacking ' + target.name;
			creep.moveTo(target);
			
			if(creep.pos.inRangeTo(target, 2)) {
				creep.attack(target);
			} else {
				creep.rangedAttack(target);
			}
			
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
}