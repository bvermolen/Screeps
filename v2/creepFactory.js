/**
 * creepFactory
 */
 var creepFactory = {
	 
	 getThreshold: function(role) {
		var thresholds = {
			'miner': 2,
			'carrier': 2,
			'builder': 1,
			'guard': 3,
			'medic': 1
		};
		
		return thresholds[role];
	},

	action: function () {
		var spawn = require('control').getSpawn();
		var _ = require('lodash');
		
		if(spawn.spawning === null) {
		
		    var roles = require('creepManager').getRoles();
		
			var creepBodies = {
				'miner': [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
				'carrier': [Game.CARRY, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],
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
					if(result===true) {
						console.log('Start spawning ' + creepRole+": "+result);
						// todo: add increase of role numbers?
						break;
					}
				}
			}
		} else {
			spawn.memory.time = Game.time;
		}
	}
}

module.exports = creepFactory;