/**
 * creepFactory
 */
 var creepFactory = {
	 
	 getThreshold: function(role) {
		var thresholds = {
			'miner': 2,
			'carrier': 2,
			'guard': 3,
			'builder': 1,
			'medic': 1
		};
		
		return thresholds[role];
	},

	action: function () {
		var spawn = require('control').getSpawn();
		
		if(spawn.spawning === null) {
		
			var roles = require('creepManager').getRoles();
			
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