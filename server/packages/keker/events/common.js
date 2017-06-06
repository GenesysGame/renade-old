global.game = 
{
	spawns: [new mp.Vector3(-425.517, 1123.620, 325.8544), new mp.Vector3(-415.777, 1168.791, 325.854), 
		new mp.Vector3(-432.534, 1157.461, 325.854), new mp.Vector3(-401.850, 1149.482, 325.854)],

	models: mp.joaat(["mp_m_weed_01", "mp_m_forgery_01", "mp_f_weed_01", "mp_f_chbar_01", 
						"player_two", "ig_nervousron", "ig_wade", "ig_floyd", "ig_chef", "player_zero", "player_one"]),
						
	weapons: mp.joaat(["WEAPON_PISTOL", "WEAPON_ASSAULTRIFLE","WEAPON_PUMPSHOTGUN","WEAPON_BULLPUPSHOTGUN","WEAPON_SAWNOFFSHOTGUN","WEAPON_COMPACTRIFLE"])
};

mp.environment.weather = 'EXTRASUNNY';
mp.environment.time.hour = 10;

    var STATE_OUTPUT       = 0,
        STATE_HTML         = 1,
        STATE_PRE_COMMENT  = 2,
        STATE_COMMENT      = 3,
        WHITESPACE         = /\s/,
        ALLOWED_TAGS_REGEX = /<(\w*)>/g;

    function striptags(html, allowableTags) {
        var html = html || '',
            state = STATE_OUTPUT,
            depth = 0,
            output = '',
            tagBuffer = '',
            inQuote = false,
            i, length, c;

        if (typeof allowableTags === 'string') {
            // Parse the string into an array of tags
            allowableTags = parseAllowableTags(allowableTags);
        } else if (!Array.isArray(allowableTags)) {
            // If it is not an array, explicitly set to null
            allowableTags = null;
        }

        for (i = 0, length = html.length; i < length; i++) {
            c = html[i];

            switch (c) {
                case '<': {
                    // ignore '<' if inside a quote
                    if (inQuote) {
                        break;
                    }

                    // '<' followed by a space is not a valid tag, continue
                    if (html[i + 1] == ' ') {
                        consumeCharacter(c);
                        break;
                    }

                    // change to STATE_HTML
                    if (state == STATE_OUTPUT) {
                        state = STATE_HTML;

                        consumeCharacter(c);
                        break;
                    }

                    // ignore additional '<' characters when inside a tag
                    if (state == STATE_HTML) {
                        depth++;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case '>': {
                    // something like this is happening: '<<>>'
                    if (depth) {
                        depth--;
                        break;
                    }

                    // ignore '>' if inside a quote
                    if (inQuote) {
                        break;
                    }

                    // an HTML tag was closed
                    if (state == STATE_HTML) {
                        inQuote = state = 0;

                        if (allowableTags) {
                            tagBuffer += '>';
                            flushTagBuffer();
                        }

                        break;
                    }

                    // '<!' met its ending '>'
                    if (state == STATE_PRE_COMMENT) {
                        inQuote = state = 0;
                        tagBuffer = '';
                        break;
                    }

                    // if last two characters were '--', then end comment
                    if (state == STATE_COMMENT &&
                        html[i - 1] == '-' &&
                        html[i - 2] == '-') {

                        inQuote = state = 0;
                        tagBuffer = '';
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                // catch both single and double quotes
                case '"':
                case '\'': {
                    if (state == STATE_HTML) {
                        if (inQuote == c) {
                            // end quote found
                            inQuote = false;
                        } else if (!inQuote) {
                            // start quote only if not already in one
                            inQuote = c;
                        }
                    }

                    consumeCharacter(c);
                    break;
                }

                case '!': {
                    if (state == STATE_HTML &&
                        html[i - 1] == '<') {

                        // looks like we might be starting a comment
                        state = STATE_PRE_COMMENT;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case '-': {
                    // if the previous two characters were '!-', this is a comment
                    if (state == STATE_PRE_COMMENT &&
                        html[i - 1] == '-' &&
                        html[i - 2] == '!') {

                        state = STATE_COMMENT;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case 'E':
                case 'e': {
                    // check for DOCTYPE, because it looks like a comment and isn't
                    if (state == STATE_PRE_COMMENT &&
                        html.substr(i - 6, 7).toLowerCase() == 'doctype') {

                        state = STATE_HTML;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                default: {
                    consumeCharacter(c);
                }
            }
        }

        function consumeCharacter(c) {
            if (state == STATE_OUTPUT) {
                output += c;
            } else if (allowableTags && state == STATE_HTML) {
                tagBuffer += c;
            }
        }

        function flushTagBuffer() {
            var normalized = '',
                nonWhitespaceSeen = false,
                i, length, c;

            normalizeTagBuffer:
            for (i = 0, length = tagBuffer.length; i < length; i++) {
                c = tagBuffer[i].toLowerCase();

                switch (c) {
                    case '<': {
                        break;
                    }

                    case '>': {
                        break normalizeTagBuffer;
                    }

                    case '/': {
                        nonWhitespaceSeen = true;
                        break;
                    }

                    default: {
                        if (!c.match(WHITESPACE)) {
                            nonWhitespaceSeen = true;
                            normalized += c;
                        } else if (nonWhitespaceSeen) {
                            break normalizeTagBuffer;
                        }
                    }
                }
            }

            if (allowableTags.indexOf(normalized) !== -1) {
                output += tagBuffer;
            }

            tagBuffer = '';
        }

        return output;
    }

    /**
     * Return an array containing tags that are allowed to pass through the
     * algorithm.
     *
     * @param string allowableTags A string of tags to allow (e.g. "<b><strong>").
     * @return array|null An array of allowed tags or null if none.
     */
    function parseAllowableTags(allowableTags) {
        var tagsArray = [],
            match;

        while ((match = ALLOWED_TAGS_REGEX.exec(allowableTags)) !== null) {
            tagsArray.push(match[1]);
        }

        return tagsArray.length !== 0 ? tagsArray : null;
    }

module.exports =
{
	"playerJoin" : player =>
	{
		player.dimension = Math.floor(player.id / 64);
		
		if(global.dimensions[player.dimension])
			global.dimensions[player.dimension]++;
		else
			global.dimensions[player.dimension] = 1;
		
		player.outputChatBox("Welcome to dimensions freeroam server<br/>Most used commands:<br/>/veh name (e. g. /veh sultanrs)<br/>/weapon name (e.g. /weapon WEAPON_PISTOL)<br/>/setdimension id (e.g. /setdimension 10)");
		player.outputChatBox("Your current dimension: " + player.dimension);
		
		// присвоим игроку случайную модель
		player.model = game.models[Math.floor(Math.random() * game.models.length)]
		
		// you can use both ways
		//game.weapons.forEach(weapon => { player.giveWeapon(weapon, 10000); });			
		player.giveWeapon(game.weapons, 1000);
		
		// заспавним в одной из точек, указанных в game.spawns
		player.spawn(game.spawns[Math.floor(Math.random() * game.spawns.length)]);

		player.veh = null;
		player.kills = 0;
	},
	
	"playerDeath" : (player, reason, killer) =>
	{
		if(killer != null)
		{
			killer.kills++;
				
			str = killer.name + "(" + killer.kills + ")" + " killed " + player.name + "(" + player.kills + ")";
			mp.players.forEach(_player => { if(_player.dimension == player.dimension) _player.outputChatBox(str); });
		}
		
		player.spawn(game.spawns[Math.floor(Math.random() * game.spawns.length)])
	},
	
	"playerQuit" : (player, reason, kickReason) =>
	{
		if(player.veh)
			player.veh.destroy();
	
		global.dimensions[player.dimension]--;
	
		const str = player.name + " quit";
		mp.players.forEach(_player => { _player.outputChatBox(str); });
	},
	
	"playerChat": (player, text) =>
	{
		// мы можем использовать html-теги в чате, так как он сделан на HTML (cef),
		// используем тег выделения для выделения количества убийств у каждого
		const str = player.name + "<b>(" + player.kills + ")</b>: " + striptags(text, '<b><s><u><strong>');
		
		// отправим сообщение всем игрокам
		mp.players.forEach(_player => { if(_player.dimension == player.dimension) _player.outputChatBox(str); });
	}
};