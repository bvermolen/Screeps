/**
 * creepFactory
 */
 var creepFactory = {
	 
	 getThreshold: function(role) {
		var thresholds = {
			'harvester': 2,
			'builder': 1,
			'guard': 3,
			'medic': 1
		};
		
		return thresholds[role];
	},

	action: function () {
		var spawn = Game.spawns.Spawn1;
		
		if(spawn.spawning === null) {
			var _ = require('lodash');
		
		    var roles = require('creepManager').getRoles();
		
			var creepBodies = {
				'harvester': [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE],
				'guard': [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.ATTACK, Game.ATTACK],
				'builder': [Game.TOUGH, Game.WORK, Game.WORK, Game.MOVE, Game.CARRY],
				'medic': [Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL, Game.HEAL],
			}
			
			for(var i in roles) {
			    var creepRole = roles[i];
			    
				var currentCreeps = require('creepManager').getRoleNumbers(creepRole);
				var threshold = this.getThreshold(creepRole);
				
				if(threshold > currentCreeps) {
					// todo: check available energy?
					var result = require('creepManager').getRoleObject(creepRole).create(spawn);
					if(_.isString(result)) {
						console.log('Start spawning ' + creepRole+": "+result);
						// todo: add increase of role numbers?
						break;
					}
				}
			}
		}
	}
}

module.exports = creepFactory;