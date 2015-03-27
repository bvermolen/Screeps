/**
 * arenaControl
 */
 var arenaControl = {

	getClosestPortal: function(creep) {
		var portals = creep.pos.findClosest(Game.STRUCTURE_PORTAL);
		if(portals.length > 0) {
		    return portals[0];
		}
		return null;
	},
	
	actionAttack: function(creep) {
		var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 15);
		
		if(targets.length > 0) {
			var target = targets[0];
			creep.moveTo(target);
			
			if(creep.pos.inRangeTo(target, 2)) {
				creep.attack(target);
			} else {
				creep.rangedAttack(target);
			}
	        return true;
			
		}
		return false;
	},
	
	actionCollect: function(creep) {

        if(creep.energy === 0) {

    		var target = creep.pos.findClosest(Game.DROPPED_ENERGY); 
    		if(target !== null) {
    			creep.moveTo(target);
    			if(creep.pos.isNearTo(target)) {
    				creep.pickup(target);
    			}
    			return true;
    		}
        } 
	    
	    return false;
	},
	
	actionDeliver: function(creep) {
	    if(creep.energy > 0) {
    
            var portal = this.getClosestPortal(creep);
    		if(portal !== null) {
    			creep.moveTo(portal);
    			if(creep.pos.isNearTo(portal)) {
    				creep.transerEnergy(portal);
    			}
    			return true;
    		} 
	    }
	    return false;
	},

    actionWarrior: function(creep) {
        if(this.actionAttack(creep)) {
            return;
        }
        
        if(this.actionCollect(creep)) {
            return;
        }
        
        if(this.actionDeliver(creep)) {
            return;
        }
    },
    
    actionRanger: function(creep) {
        if(this.actionAttack(creep)) {
            return;
        }
        
        if(this.actionCollect(creep)) {
            return;
        }
        
        if(this.actionDeliver(creep)) {
            return;
        }
    },
    
    actionTough: function(creep) {
        
        if(this.actionAttack(creep)) {
            return;
        }
        
        if(this.actionCollect(creep)) {
            return;
        }
        
        if(this.actionDeliver(creep)) {
            return;
        }

    },
    
    actionHealer: function(creep) {
        
        if(this.actionDeliver(creep)) {
            return;
        }
        
		var target = creep.pos.findClosest(Game.MY_CREEPS, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});

		if(target !== null) {
			creep.moveTo(target);
			if(creep.pos.isNearTo(target)) {
				creep.heal(target);
			}	else {
				creep.rangedHeal(target);
			}
		} else {
		    this.actionCollect(creep);
		}
    },
	
	action: function(creep) {
		
		//console.log(creep.name);
		
		switch(creep.name) {
		    case 'GladWarrior':
		        this.actionWarrior(creep);
		        break;
		    case 'GladRanger':
		        this.actionRanger(creep);
		        break;
		    case 'GladTough':
		        this.actionTough(creep);
		        break;
		    case 'GladHealer':
		        this.actionHealer(creep);
		        break;
		}

	}
};

module.exports = arenaControl;