/**
 * role_carrier
 */
var role_carrier = {
	
	create: function(spawn, creepMemory) {
		var bodyParts = [Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE, Game.MOVE];
		creepMemory.role = 'carrier';
		creepMemory.sourceID = null;
		var numCreeps = require('creepManager').getRoleNumbers(creepMemory.role);
		var result = spawn.createCreep(bodyParts, creepMemory.role + '_' + numCreeps, creepMemory);
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();

		if(creep.memory.sourceID!==null) 
		{
			var source = Game.getObjectById(creep.memory.sourceID);

			if(source!==null) {
				if(creep.energy > 0 && creep.pos.inRangeTo(spawn, 1)) {
					creep.transferEnergy(spawn);
					this.say(creep, 'Deliver Energy to' + spawn.name);
					return;
				} else if(creep.energy == creep.energyCapacity) {
					creep.moveTo(spawn);
					this.say(creep, 'On route to delivery energy to ' + spawn.name);
					return;
				} else if(creep.pos.inRangeTo(source, 2)) {
					
					var targets = _.sortBy(source.room.find(Game.MY_CREEPS, { 
						filter: function(object) { 
							return object.memory.role == 'miner' && object.memory.sourceID === creep.memory.sourceID;
						}
					}), 'energy');

					if(targets.length > 0) {
						var target = _.last(targets);
						creep.moveTo(target);
						target.transferEnergy(creep);
					} else {
						this.say(creep, 'Could not find miners');
					}
					return;
				} else {
					creep.moveTo(source);
					return;
				}
			}
		}
		this.idle(creep);
	}
};

module.exports = role_carrier;