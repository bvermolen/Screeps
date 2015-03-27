/**
 * survivalControl
 */
 var survivalControl = {

	getSpawn: function(room) {
		var spawns = room.find(Game.MY_SPAWNS);

        if(spawns.length > 0) {
            return spawns[0];
        }

		return null;
	},
	
	setInitialSpawnMemory: function(spawn) {
		spawn.memory.sources = new Array();

		var sources = spawn.room.find(Game.SOURCES);
		for(var i in sources)
		{
		    var source = sources[i];
		    
			var paths = source.pos.findPathTo(spawn);
			
			if(paths.length > 0) {
				spawn.memory.sources.push({ 
					id: source.id,
					//pos: source.pos,
					distance: paths.length,
					pathStatus: null,
					pathInvalid: 0,
					paths: paths,
					activeMiners: 0,
					activeCarriers: 0
				});
			}
		}
		spawn.memory.sources = _.sortBy(spawn.memory.sources, 'distance');
	},
	
	setInitialFlagMemory: function(spawn) {
		spawn.memory.flags = new Array();

		var exits = require('survivalRoomManager').getExits(spawn.room);
		
		for(var i in exits) {
			var exit = exits[i];
			
			var paths = spawn.pos.findPathTo(exit);
			var flagPos = paths.length / 2;
			if(paths.length < 5) {
				flagPos = paths.length - 1;
			} else if(flagPos < 5) {
				flagPos = 5;
			}
			flagPos = Math.round(flagPos);
			
			var flagLocation = paths[flagPos];
			
			var flagName = spawn.room.name+'_exit_'+exit.exit;
			var result = spawn.room.createFlag(flagLocation.x, flagLocation.y, flagName);
			
			if(_.isString(result)) {
				spawn.memory.flags.push({ 
					name: flagName,
					distance: paths.length,
					posX: flagLocation.x,
					posY: flagLocation.y,
					squad: 1
				});
			}
		}
		spawn.memory.flags = _.sortBy(spawn.memory.flags, 'distance');
	},
	
	harvesting: function(spawn) {
		
		var unassignedMiners = _.sortBy(spawn.room.find(Game.MY_CREEPS, { 
			filter: function(object) {
				return object.spawning === false && object.memory.role == 'miner' && object.memory.sourceID === null;
			}
		}), 'ticksToLive');
		
		var unassignedCarriers = _.sortBy(spawn.room.find(Game.MY_CREEPS, { 
			filter: function(object) { 
				return object.spawning === false && object.memory.role == 'carrier' && object.memory.sourceID === null;
			}
		}), 'ticksToLive');
		
		for(var i in spawn.memory.sources)
		{
			var sourceMemory = spawn.memory.sources[i];
			var source = Game.getObjectById(sourceMemory.id);
				
			// miners
			var activeMiners = source.room.find(Game.MY_CREEPS, { 
				filter: function(object) { 
					return object.memory.role == 'miner' && object.memory.sourceID === source.id;
				}
			});
			sourceMemory.activeMiners = activeMiners.length;
			
			if(activeMiners.length < 2 && unassignedMiners.length > 0) {
				var miner = _.take(unassignedMiners);
				unassignedMiners = _.drop(unassignedMiners);
				miner.memory.sourceID = source.id;
			}
			
			// carriers
			var activeCarriers = source.room.find(Game.MY_CREEPS, { 
				filter: function(object) { 
					return object.memory.role == 'carrier' && object.memory.sourceID === source.id;
				}
			});
			sourceMemory.activeCarriers = activeCarriers.length;
			
			if(activeCarriers.length < 2 && unassignedCarriers.length > 0) {
				var carrier = _.take(unassignedCarriers);
				unassignedCarriers = _.drop(unassignedCarriers);
				carrier.memory.sourceID = source.id;
			}
		}
	},
	
	constructPathPlan: function(spawn, sourceMemory) {
		sourceMemory.pathInvalid = 0;
		for(var p in sourceMemory.paths) {
		    var path = sourceMemory.paths[p];

	        var res = spawn.room.createConstructionSite(path, Game.STRUCTURE_ROAD);
	        if(res===Game.OK) {
	            console.log('Construct path at '+path.x+'.'+path.y);     
	        } else {
	            sourceMemory.pathInvalid++; 
	        }
		}
		sourceMemory.pathStatus = 'building';
	},
	
	constructPathCheckCompleted: function(spawn, sourceMemory) {
	    var posCompleted = 0;
	    
		for(var p in sourceMemory.paths) {
		    var path = sourceMemory.paths[p];
	    
		    var pathFinished = _.some(spawn.room.lookAt(path), function (obj) { 
		        return obj.type==='structure' && obj.structure.structureType === Game.STRUCTURE_ROAD;
		    });
		    
		    if(pathFinished) {
		        posCompleted++;
		    }
		}
		
		if(sourceMemory.paths.length===(sourceMemory.pathInvalid+posCompleted)) {
		    sourceMemory.pathStatus = 'completed';
		}
	},
	
	constructPath: function(spawn) {
		// path for source - spawn
		var sourceMemoryBuilding = _.find(spawn.memory.sources, function(obj) {
		   return obj.pathStatus === 'building';
		});
		if(sourceMemoryBuilding) {
		    if(!this.constructPathCheckCompleted(spawn, sourceMemoryBuilding)) {
		        return;
		    }
		}
		
		var sourceMemoryNull = _.find(spawn.memory.sources, function(obj) {
		   return obj.pathStatus === null && obj.activeMiners > 0;
		});
		if(sourceMemoryNull) {
		    this.constructPathPlan(spawn, sourceMemoryNull);
		}
	    
	},
	
	construction: function(spawn) {
	    
	    this.constructPath(spawn);

		// defence structures at exits
		/*
			build a funnel with defensive structures
		*/
	},
	
	defence: function(spawn) {
		
		
		
		// fill defence structures with guardRange
		
		// create a squad per flag (2 guardClose, 2 guardRange, 1 medic)
		// locate squads near spawn
		// as soon there is a squad per flag, move squads to the flags
	},
	
	action: function(spawn) {
		
		if(!spawn.memory.sources) {
		    this.setInitialSpawnMemory(spawn);
		}
		if(!spawn.memory.flags) {
		    this.setInitialFlagMemory(spawn);
		}
		
		this.harvesting(spawn);
		this.construction(spawn);
		this.defence(spawn);
	}
};

module.exports = control;