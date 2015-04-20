/**
 * survivalCreepManager
 */
var survivalCreepManager = {

    updateCreepMemory: function (creep) {
        creep.memory.energy = creep.energy;
        creep.memory.posX = creep.pos.x;
        creep.memory.posY = creep.pos.y;
    },

    getRoleObject: function (role) {

        var base = require('survivalRole_base');
        var obj = require('survivalRole_' + role);

        for (var k in base) {
            if (!obj.hasOwnProperty(k)) {
                obj[k] = base[k];
            }
        }

        return obj;
    },

    action: function () {
        for (var cName in Game.creeps) {
            var creep = Game.creeps[cName];

            if (creep.spawning) {
                continue;
            }

            this.updateCreepMemory(creep);

            var obj = this.getRoleObject(creep.memory.role);

            obj.action(creep);
        }
    },

    getRoles: function () {
        return [
            'miner',
            'carrier',
            'guard',
            'medic',
            'builder'
        ];
    },

    getRoleNumbers: function (role) {
        var num = 0;
        for (var cName in Game.creeps) {
            var creep = Game.creeps[cName];

            if (creep.memory.role === role) {
                num++;
            }
        }

        return num;
    }


};

module.exports = survivalCreepManager;