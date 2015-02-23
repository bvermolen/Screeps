/**
 * main
 */

var _ = require('lodash');

for(var sName in Game.spawns) {
	var spawn = Game.spawns[sName];
	spawn.memory.energy = spawn.energy;
	spawn.memory.spawning = spawn.spawning;
	spawn.memory.posX = spawn.pos.x;
	spawn.memory.posY = spawn.pos.y;
}

require('control').action();

require('creepManager').action();

require('creepFactory').action();