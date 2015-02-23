/**
 * control
 */
 var control = {
	
	getSpawn: function() {
		var spawns = Game.spawns;
		
		for(var s in spawns) {
			return spawns[s];
		}
	},
	
	harvesting: function()
	{
		var spawn = this.getSpawn();
		
		if(!spawn.memory.sources) {
		    spawn.memory.sources = Array();
		    
			var sources = spawn.room.find(Game.SOURCES);
			for(var i in sources)
			{
			    var source = sources[i];
			    
				var path = source.pos.findPathTo(spawn);
				
				if(path.length > 0) {
					spawn.memory.sources.push({ 
						id: source.id,
						//pos: source.pos,
						distance: path.length
					});
				}
			}
			spawn.memory.sources = _.sortBy(spawn.memory.sources, 'distance');
		}
		
		var unassignedMiners = _.sortBy(spawn.room.find(Game.MY_CREEPS, { 
			filter: function(object) { 
				return object.memory.role == 'miner' && object.memory.sourceID === null;
			}
		}), 'ticksToLive');
		
		var unassignedCarriers = _.sortBy(spawn.room.find(Game.MY_CREEPS, { 
			filter: function(object) { 
				return object.memory.role == 'carrier' && object.memory.sourceID === null;
			}
		}), 'ticksToLive');
		
		for(var i in spawn.memory.sources)
		{
			var source = sources[i];
				
			// miners
			var activeMiners = source.room.find(Game.MY_CREEPS, { 
				filter: function(object) { 
					return object.memory.role == 'miner' && object.memory.sourceID === source.id;
				}
			});
			
			if(activeMiners.length < 2 && unassignedMiners.length > 0) {
				var miners = _.pullAt(unassignedMiners, 0);
				
				miners[0].memory.sourceID = source.id;
			}
			
			// carriers
			var activeCarriers = source.room.find(Game.MY_CREEPS, { 
				filter: function(object) { 
					return object.memory.role == 'carrier' && object.memory.sourceID === source.id;
				}
			});
			
			if(activeCarriers.length < 2 && unassignedCarriers.length > 0) {
				var carriers = _.pullAt(unassignedCarriers, 0);
				
				carriers[0].memory.sourceID = source.id;
			}
		}
	},
	
	construction: function()
	{
		
	},
	
	defence: function()
	{
		
	},
	
	action: function()
	{
		this.harvesting();
		this.construction();
		this.defence();
	}
}

module.exports = control;