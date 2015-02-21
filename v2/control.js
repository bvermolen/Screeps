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
		
		if(!Memory.sources) {
			var sources = spawn.room.find(Game.SOURCES);
			for(var source in sources)
			{
				var path = source.pos.findPathTo(spawn);
				
				if(path.length > 0) {
					source.distance = path.length;
					Memory.sources[source.id] = source;
				}
			}
		}
		
		/*
		var nextUnfilledSource = spawn.pos.findClosest(Game.SOURCES, Memory.Sources, {
			filter: function(object) {
				return object.activeMinders < 2;
			}
		});
		*/
		
		// find unassigned miners and assign them to a source.
		// assign 2 miner per source point, starting with the closest
		// assign 2 carriers per source point, starting with the closest
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