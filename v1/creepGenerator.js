/**
 * creepGenerator
 */
 module.exports = function (creepTypes) {
    var spawn = Game.spawns.Spawn1;
    var _ = require('lodash');
    
    if(spawn.spawning === null) {
    
        var creepThresholds = {
            'harvester': 2,
            'builder': 1,
            'guard': 3,
            'medic': 1
        }
        var creepBodies = {
            'harvester': [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE],
            'guard': [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.ATTACK, Game.ATTACK],
            'builder': [Game.TOUGH, Game.WORK, Game.WORK, Game.MOVE, Game.CARRY],
            'medic': [Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL],
        }
        
        for(var cType in creepThresholds) {
            // check threshold limit
            if(creepThresholds[cType] > creepTypes[cType])	 {
                var result = spawn.createCreep(creepBodies[cType], cType + "_"+creepTypes[cType], {'role':cType});
                if(_.isString(result)) {
                    console.log('Start spawning ' + cType+": "+result);
                    creepTypes[cType]++;
                    break;
                } else {
                    console.log('Could not start spawning ' + creepRole+": "+result);
                }
            }
        }
    }
}
