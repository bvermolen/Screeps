/**
 * creepFactory
 */
 var creepFactory = {

	addToQueue: function(spawn, role, creepMemory) {
		
		if(creepMemory===undefined) {
			creepMemory = {};
		}
		
		spawn.memory.buildQueue.push({
			role: role,
			creepMemory: creepMemory
		});
	},
	
	getFromQueue: function(spawn) {
		
		if(spawn.memory.buildQueue.length > 0) {
			var obj = _.take(spawn.memory.buildQueue);
			spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			
			return obj;
		}
		return null;
		
	}
	
	action: function (spawn) {
		
		if(!spawn.memory.buildQueue) {
			spawn.memory.buildQueue = Array();

			this.addToQueue(spawn, 'miner');
			this.addToQueue(spawn, 'miner');
			this.addToQueue(spawn, 'carrier');
			this.addToQueue(spawn, 'carrier');
			this.addToQueue(spawn, 'guard', {squad: 1});
			this.addToQueue(spawn, 'guard', {squad: 1});
			this.addToQueue(spawn, 'guard', {squad: 1});
			this.addToQueue(spawn, 'guard', {squad: 1});
			this.addToQueue(spawn, 'builder');
			this.addToQueue(spawn, 'builder');
			this.addToQueue(spawn, 'medic', {squad: 1});
		}
		
		if(spawn.spawning === null) {
		
			var creep = _.take(spawn.memory.buildQueue);
			
			var result = require('creepManager').getRoleObject(creep.role).create(spawn, creep.creepMemory);
			if(result===true) {
				console.log('Start spawning ' + creepRole+": "+result);
				spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			}

		}
	}
}

module.exports = creepFactory;