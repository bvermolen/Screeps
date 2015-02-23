/**
 * medic
 */
module.exports = {
	
	create: function(spawn) {
		var bodyParts = [Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL];
		var role = 'medic';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role});
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();
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
			this.idle(creep);
		}
	}
}