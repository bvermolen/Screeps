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
		
		// loop through sources
		//	count active miners, if <2 then assign unassigned miner
		//	count active carriers, if <2 then assign unassigned carriers

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