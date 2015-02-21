/**
 * creepManager
 */
var creepManager = {

	updateCreepMemory: function(creep) {
		creep.memory.energy = creep.energy;
		creep.memory.posX = creep.pos.x;
		creep.memory.posY = creep.pos.y;
	},
	
	getRoleObject: function(role) {
		
		var base = require('role_base');
		var obj = require('role_'+role);
		
		for (var k in base) {
			if (!obj.hasOwnProperty(k)) {
				obj[k] = base[k];
			}
		}
		
		return obj;
	},
	
	action: function() {
		for(var cName in Game.creeps) {
			var creep = Game.creeps[cName];
			
			this.updateCreepMemory(creep);
			
			var obj = this.getRoleObject(creep.memory.role);
			
			obj.action(creep);
		}
	},
	
	getRoles: function() {
		var roles = [
				'miner',
				'carrier',
				'builder',
				'guard',
				'medic'
				];
		return roles;
	},
	
	getRoleNumbers: function(role) {
		var num = 0;
		for(var cName in Game.creeps) {
			var creep = Game.creeps[cName];
			
			if(creep.memory.role === role) {
				num++;
			}
		}
		
		return num;
	}
	

}

module.exports = creepManager;