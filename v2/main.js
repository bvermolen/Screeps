/**
 * main
 */
console.log('Time: '+Game.time);

var _ = require('lodash');

for(var sName in Game.spawns) {
	var spawn = Game.spawns[sName];
	spawn.memory.energy = spawn.energy;
	spawn.memory.spawning = spawn.spawning;
	spawn.memory.posX = spawn.pos.x;
	spawn.memory.posY = spawn.pos.y;
}

var spawn = require('control').getSpawn();

if(spawn  !== null) {
	require('control').action(spawn);
	require('creepFactory').action(spawn);
}

require('creepManager').action(spawn);