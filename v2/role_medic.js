/**
 * medic
 */
var role_medic = {
	
	create: function(spawn, creepMemory) {
		var bodyParts = [Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL];
		creepMemory.role = 'medic';
		var numCreeps = require('creepManager').getRoleNumbers(creepMemory.role);
		var result = spawn.createCreep(bodyParts, creepMemory.role + '_' + numCreeps, creepMemory);
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
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
		} else {
			this.idleDefence(creep);
		}
	}
};

module.exports = role_medic;