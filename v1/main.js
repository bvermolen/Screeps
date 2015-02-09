/**
 * main
 */
var builder = require('builder');
var guard = require('guard');
var harvester = require('harvester');
var medic = require('medic');

var creepGenerator = require('creepGenerator');

var creepTypes = {
    'harvester': 0,
    'builder': 0,
    'guard': 0,
    'medic': 0
}

for(var sName in Game.spawns) {
	var spawn = Game.spawns[sName];
    spawn.memory.energy = spawn.energy;
    spawn.memory.spawning = spawn.spawning;
    spawn.memory.posX = spawn.pos.x;
    spawn.memory.posY = spawn.pos.y;
}

for(var cName in Game.creeps) {
	var creep = Game.creeps[cName];
	
	creep.memory.energy = creep.energy;
	
	creepTypes[creep.memory.role]++;

	if(creep.memory.role == 'harvester') {
		harvester(creep);
	}

	if(creep.memory.role == 'builder') {
	    builder(creep);
	}
	
	if(creep.memory.role == 'guard') {
	    guard(creep);
    }
	
	if(creep.memory.role == 'medic') {
	    medic(creep);
    }
}

creepGenerator(creepTypes);