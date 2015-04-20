/**
 * survivalRole_guard
 */
var survivalRole_guard = {

    create: function (spawn, creepMemory) {
        var bodyParts = [Game.TOUGH, Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.ATTACK, Game.ATTACK];
        creepMemory.role = 'guard';
        var numCreeps = require('survivalCreepManager').getRoleNumbers(creepMemory.role);
        var result = spawn.createCreep(bodyParts, creepMemory.role + '_' + numCreeps, creepMemory);

        if (_.isString(result)) {
            return true;
        }
        return result;
    },

    action: function (creep) {
        var targets = creep.room.find(Game.HOSTILE_CREEPS);

        if (targets.length > 0) {
            var target = targets[0];
            this.say(creep, 'Attacking ' + target.name);
            creep.moveTo(target);

            if (creep.pos.inRangeTo(target, 2)) {
                creep.attack(target);
            } else {
                creep.rangedAttack(target);
            }

        } else {
            this.idleDefence(creep);
        }
    }
};

module.exports = survivalRole_guard;