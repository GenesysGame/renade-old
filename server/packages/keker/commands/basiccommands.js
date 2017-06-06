var vehs = mp.joaat(["kuruma2", "oracle2", "maverick", "infernus"]);

module.exports =
{
	"pos": (player, args) =>
	{
		var pos = player.position;
		player.outputChatBox("X: <b>" + pos.x + "</b>, Y: <b>" + pos.y + "</b>, Z: <b>" + pos.z + "</b>");
	},
	
	"repair" : (player, args) =>
	{
		player.vehicle.repair();
	},
	
	"slapmepls": (player, args) =>
	{
		var pos = player.position;
		pos.z += 2.0;
		
		player.position = pos;
	},
	
	"veh": (player, args) =>
	{
		var pos = player.position;
		pos.x += 2.0;
			
		// добавим созданную машину в массив createdVehs, чтобы контролировать в дальнейшем количество
		// созданных игроками машин
		if(player.veh)
			player.veh.destroy();
		
		player.veh = mp.vehicles.new(mp.joaat(args[1]), pos);
		player.veh.dimension = player.dimension;
	},
		
	"setweather": (player, args) =>
	{
		mp.environment.weather = args[1];
	},
		
	"settime": (player, args) =>
	{
		mp.environment.time.hour = parseInt(args[1]);
	},
	
	"setdimension": (player, args) =>
	{
		let id = parseInt(args[1]);
		
		if(global.dimensions[id]
			&& global.dimensions[id] > 63)
		{
			player.outputChatBox("Dimension is full");
		}
		else
		{
			if(global.dimensions[id])
			{
				global.dimensions[id]++;
				global.dimensions[player.dimension]--;
				player.dimension = id;
				player.outputChatBox("You have set your dimension!");
			}
			else
			{
				global.dimensions[id] = 1;
				global.dimensions[player.dimension]--;
				player.dimension = id;
				player.outputChatBox("You have set your dimension!");
			}
		}
		
	},
	
	"model": (player, args) =>
	{
		player.model = mp.joaat(args[1]);
		player.giveWeapon(game.weapons, 1000);
	},
	
	"weapon": (player, args) =>
	{
		player.giveWeapon(mp.joaat(args[1]), 1000);
	},
	
	"clothes": (player, args) =>
	{
		player.setClothes(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]));
	},
	
	"prop": (player, args) =>
	{
		player.setProp(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
	}
};