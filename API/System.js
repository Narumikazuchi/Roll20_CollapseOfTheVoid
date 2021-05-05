/*
    Initialization
*/
var System = {};

System.Database = {};
System.Database.Characters = {};
System.Database.Players = {};

/*
    Event Handlers
*/
on("ready", function(args) {
    // Create a database to find the IDs for the attributes and tokens easier
    System.buildDB();
    on("change:character", System.buildDB);
    on("destroy:character", System.buildDB);
    // We want to catch any API command that is designed for us
    on("chat:message", System.handleChatInput);
    // Initialize new character
    on("add:character", System.initCharacter);
    // Is Character alive
    on("change:attribute", System.aliveCheck);
    // Just tell the log that we installed without any errors
    log("System initialized");
});

/**
 * @desc Initializes a newly added character.
 * 
 * @param {Object} arg Object carrying the data.
 * 
 * @returns {void} Nothing. This is a process.
 */
System.initCharacter = function(arg)
{
    var id = arg.get('_id'),
        attr = [],
        init;
    // Only if not initialized already
    if(System.Database.Characters[id] && System.Database.Characters[id]._initialized) return;
    init = findObjs({ _type: "attribute", _characterid: id, name: "_initialized" })[0];
    if(init && init.get('current') == true)
    {
        System.buildDB();
        return;
    }
    // For later instances, we are initialized
    attr[attr.length] = createObj("attribute", {
        name: "_initialized",
        current: true,
        _characterid: id
    });
    // Health
    attr[attr.length] = createObj("attribute", {
        name: "HealthState",
        current: "tödlich verwundet",
        _characterid: id
    });
    // Race
    attr[attr.length] = createObj("attribute", {
        name: "Race",
        current: "Mensch",
        _characterid: id
    });
    // Weapon
    attr[attr.length] = createObj("attribute", {
        name: "WeaponName",
        current: "unbewaffnet",
        _characterid: id
    });
    // Magic
    attr[attr.length] = createObj("attribute", {
        name: "MagicName",
        current: "saftleer",
        _characterid: id
    });
    // Physical Stats
    attr[attr.length] = createObj("attribute", {
        name: "Fitness",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Strength",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Sturdiness",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Agility",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Dexterity",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Concentration",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Creativity",
        current: "sehr schlecht",
        _characterid: id
    });
    // Social Stats
    attr[attr.length] = createObj("attribute", {
        name: "Negotiate",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Bluff",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Language",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Handle",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Hide",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Search",
        current: "sehr schlecht",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "Collect",
        current: "sehr schlecht",
        _characterid: id
    });
    // Internal
    // :Stats
    attr[attr.length] = createObj("attribute", {
        name: "HP",
        current: 0,
        max: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "ATK",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "MAG",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "HIT",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "AVO",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "DEF",
        current: 0,
        _characterid: id
    });
    // :Attribute Values
    attr[attr.length] = createObj("attribute", {
        name: "FitnessVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "KörperkraftVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "RobustheitVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "AgilitätVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "GeschickVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "KonzentrationVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "KreativitätVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "VerhandelnVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "BluffenVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "SpracheVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "UmgangVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "VerbergenVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "SuchenVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "SammelnVal",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "MagicTalent",
        current: 0,
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "MagicWeapon",
        current: "false",
        _characterid: id
    });
    attr[attr.length] = createObj("attribute", {
        name: "WeaponQuality",
        current: 1,
        _characterid: id
    });
    // Map to Database
    System.Database.Characters[id] = { tokens: [] };
    if(arg.get('controlledby') !== "") {
        System.Database.Players[arg.get('controlledby')].Characters[System.Database.Characters.length] = id;
    }
    attr.forEach(item => {
        System.Database.Characters[id][item.get('name')] = item.get('_id');
    });
};

/**
 * @desc Build the Database for easy access
 * 
 * @returns {void} Nothing. This is a process.
 */
System.buildDB = function()
{
    System.Database = {
        Characters: {},
        Players: {}
    };
    // First the players
    var plrs = findObjs({ _type: "player" });
    plrs.forEach(item => {
        var newentry = {
            name: item.get('_displayname'),
            Characters: []  // We will assign these later when we cycle through the characters
        };
        System.Database.Players[item.get('_id')] = newentry;
    });
        // Going through the characters now
    var chars = findObjs({ _type: "character" });
    chars.forEach(item => {
        System.Database.Characters[item.get('_id')] = {
            tokens: []
        };
        if(item.get('controlledby') !== "") {
            // I actually hate this fcking line -.- Not intuitive at all
            System.Database.Players[item.get('controlledby')].Characters.push(item.get('_id'));
        }
    });
    // We now assigned any character that is associated with a player to that player. We also created space to link the attribute IDs
    // which we will fill now
    var attrs = findObjs({ _type: "attribute" });
    attrs.forEach(item => {
        // Another shitty line of code, but hey it's efficient and not nearly as long as the one before
        System.Database.Characters[item.get('_characterid')][item.get('name')] = item.get('_id');
    });
    // The characters have tokens assigned to them. For shield stuff we need their IDs as well
    var token = findObjs({ _type: "graphic", _subtype: "token" });
    token.forEach(item => {
        if(item.get('represents') !== "" && System.Database.Characters[item.get('represents')]) {
            // And again the efficient lines take over even though underscore would probably be much more efficient and cryptic <.<
            System.Database.Characters[item.get('represents')].tokens.push(item.get('_id'));
        }
    });
};

/**
* @desc Puts the processor at a hold for "amount" milliseconds
* 
* @param {Number} amount The amount of ms to sleep
* 
* @returns {void} Nothing. This is a process.
*/
System.sleep = function(amount) {
   var start = new Date().getTime();
   while(new Date() - start < amount) { }
   return;
};

//
System.clamp = function(value, min, max)
{
    if(isNaN(value) || isNaN(min) || isNaN(max)) { log("Couldn't clamp numbers. value: " + value + " min: " + min + " max: " + max); return 0; }
    if(value > max) return max;
    return value < min ? min : value;
};

/**
 * @desc Creates a random number to compare to the hit rate
 * @returns {Number} A random number between 1-100
 */
System.doubleRoll = function(max) {
    if(!max) max = 100;
    // Roll 2 numbers
    var a = randomInteger(max),
        b = randomInteger(max);
    // Generate the average, clamp and round it
    return Math.round(System.clamp((a + b) / 2, 1, max));
};

//
System.inArc = function(caster, initialTarget, target, arc, dist)
{
    var x,
        x1,
        x2,
        y,
        y1,
        y2,
        d,
        a;
    if(!initialTarget || !target || !caster) return false;
    x1 = caster.get('left');
    y1 = caster.get('top');
    x2 = initialTarget.get('left');
    y2 = initialTarget.get('top');
    x = target.get('left');
    y = target.get('top');
    d = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
    if(d > dist) return false;
    a = Math.atan2(y2 - y1, x2 - x1);
    return Math.atan2(y - y1, x - x1) < a + System.toRad(arc / 2) && Math.atan2(y - y1, x - x1) > a - System.toRad(arc / 2);
};

System.toRad = function(value)
{
    return value * (Math.PI / 180);
};

System.toDeg = function(value)
{
    return value * (180 / Math.PI);
};

System.translateAngle = function(value)
{
    return value % (2 * Math.PI);
};

System.getDistanceBetweenPoints = function(p1, p2)
{
    if(!p1 || !p2) return 0;
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
};

System.tokenToPoint = function(token)
{
    if(!token) return { x: 0, y: 0 };
    return { x: parseInt(token.get('left')), y: parseInt(token.get('top')) };
}

/**
 * @desc Checks if a character is alive or not
 * 
 * @param {string} trg_id The ID-String of the character to check
 * 
 * @returns {void} True when character alive.
 */
System.isAlive = function(trg_id) {
    // Failsafe
    if(!getObj("character", trg_id)) return false;
    // Do check
    return getAttrByName(trg_id, "HP") > 0;
};

System.aliveCheck = function(attr)
{
    if(!attr.get('name') === "HP") return;
    var src_id = attr.get('_characterid'),
        tokens = findObjs({ _type: "graphic", _subtype: "token", represents: src_id });
    if(!System.isAlive(src_id))
    {
        tokens.forEach(item => {
            item.set("status_skull", true);
        });
    }
    else
    {
        tokens.forEach(item => {
            item.set("status_skull", false);
        });
    }
};

/**
 * @desc Calculates the hitrate against a target and returns if it will hit
 * 
 * @param {string} src_id The ID-String of the attacker or "source"
 * @param {string} trg_id The ID-String of the target
 * 
 * @returns {boolean} Did the attacker hit?
 */
System.hitcheck = function(src_id, trg_id, diff) {
    var src = getObj("character", src_id),
        trg = getObj("character", trg_id);
    // Failsafe
    if(!src || !trg) { log("Error at Functions.checkForHit(): Can't hitcheck without source or target."); return false; }
    // Get our attributes
    var hit = parseInt(getAttrByName(src_id, "HIT")),
        avo = parseInt(getAttrByName(trg_id, "AVO")) * (diff ? 2 : 1);
    // Another Failcheck
    if(isNaN(hit) || isNaN(avo)) { log("Error at Functions.checkForHit(): Either DEX of source or REF of target aren't numeric values."); return false; }
    // Now do magic... more like check if a random number fits the chance of hitting and return the boolean
    var does_hit = System.doubleRoll(100) < parseInt(100 * System.clamp(3 * hit / (1 + 10 * avo), 0.25, 1.));
    // Returns last...
    return does_hit;
};

/**
 * @desc Calculates the damage dealt against the target
 * 
 * @param {Number} atkval The amount of offensive strength (usually either STR, MAG or in rare cases DEX)
 * @param {Number} defval The amount of defensive strength (always DEF, RES or none)
 * @param {Boolean} diff Tells if the attack was difficult
 * 
 * @returns {Number} The amount of actual damage
 */
System.calculateDamage = function(atkval, defval, diff) {
    // Calculate the damage value with the following formula:
    var value = 50 * atkval - 25 * defval;
    if(diff) value *= 1.25;
    // Applying a variance if the value is greater than the minimun and return our result
    return parseInt(value);
};

//
System.dealDamage = function(src_id, trg_id, factor, magic, sure, diff, dmg)
{
    var atk, def, shd_broken = false;
    var hp_obj = getObj("attribute", System.Database.Characters[trg_id]["HP"]);
    var wpn = 0;
    if(!hp_obj || !System.isAlive(trg_id)) 
    {
        log("Damage: No such object!");
        return -1;
    }
    if(!sure && !System.hitcheck(src_id, trg_id, diff))
    {
        System.dodgeText(src_id, trg_id);
        return 0;
    }
    if(diff === undefined) diff = false;
    if(dmg === undefined)
    {
        atk = magic ? parseInt(getAttrByName(src_id, "MAG")) : parseInt(getAttrByName(src_id, "ATK"));
        def = magic ? 0 : parseInt(getAttrByName(trg_id, "DEF"));
        if((magic && JSON.parse(getAttrByName(src_id, "MagicWeapon")) === true) ||
           (!magic && JSON.parse(getAttrByName(src_id, "MagicWeapon")) !== true))
        {
            wpn = getObj("attribute", System.Database.Characters[src_id]["WeaponQuality"]) ? 100 * (1 + parseInt(getAttrByName(src_id, "WeaponQuality"))) : 0;
        }
        dmg = System.calculateDamage((atk + wpn), def, diff);
    }
    dmg *= 0.5 + Math.random();
    dmg *= factor;
    dmg = Math.round(dmg);
    if(!isNaN(parseInt(getAttrByName(trg_id, "DEF", "max"))))
    {
        var def_obj = getObj("attribute", System.Database.Characters[trg_id]["DEF"]);
        if(def_obj)
        {
            dmg = Math.round(dmg * 1/3);
            def_obj.set("max", "");
            shd_broken = true;
        }
    }
    System.damagedText(src_id, trg_id, dmg);
    if(dmg > parseFloat(hp_obj.get('current')))
    {
        System.killText(src_id, trg_id);
    }
    else if(dmg > 0.75 * parseFloat(hp_obj.get('max')))
    {
        if(System.doubleRoll(100) < 50)
        {
            dmg = hp_obj.get('current');
            System.shockKillText(trg_id);
        }
    }
    hp_obj.set({ current: parseInt(hp_obj.get('current')) - dmg > 0 ? parseInt(hp_obj.get('current')) - dmg : 0 });
    System.updateHealthState(trg_id);
    if(!isNaN(parseInt(getAttrByName(src_id, "ATK", "max"))))
    {
        var atk_obj = getObj("attribute", System.Database.Characters[src_id]["ATK"]);
        if(atk_obj)
        {
            atk_obj.set({
                current: atk_obj.get('max'),
                max: ""
            });
            sendChat("character|" + src_id, "/em fühlt, wie die überwältigende Stärke schwindet.");
        }
    }
    if(shd_broken)
    {
        sendChat("character|" + trg_id, "/em fühlt, wie die magische Energie des Schildes schwindet.");
    }
    return dmg;
};

//
System.healTarget = function(src_id, trg_id, amount)
{
    amount = amount === undefined ? (parseInt(getObj("attribute", System.Database.Characters[src_id]["MagicTalent"]).get('current')) + 1) * (5000 + System.doubleRoll(1250)) : amount;
    var hp_obj = getObj("attribute", System.Database.Characters[trg_id]["HP"]);
    var real = parseInt(hp_obj.get('current')) + amount > parseInt(hp_obj.get('max')) ? parseInt(hp_obj.get('max')) : parseInt(hp_obj.get('current')) + amount;
    real = Math.round(real);
    log("Heal: " + Math.round(amount));
    hp_obj.set('current', real);
    System.healText(src_id, trg_id, amount);
    System.updateHealthState(trg_id);
};

//
System.damagedText = function(src_id, trg_id, dmg)
{
    var hp_obj = getObj("attribute", System.Database.Characters[trg_id]["HP"]);
    var hp = parseFloat(hp_obj.get('current')) / parseFloat(hp_obj.get('max'));
    var text = "keinen Schaden an ";
    log("Damage: " + dmg);
    if(dmg > 0.05 * parseInt(hp_obj.get('max')))
    {
        text = "kaum Schaden an ";
    }
    if(dmg > 0.1 * parseInt(hp_obj.get('max')))
    {
        text = "leichten Schaden an ";
    }
    if(dmg > 0.2 * parseInt(hp_obj.get('max')))
    {
        text = "beachtlichen Schaden an ";
    }
    if(dmg > 0.4 * parseInt(hp_obj.get('max')))
    {
        text = "großen Schaden an ";
    }
    if(dmg > 0.6 * parseInt(hp_obj.get('max')))
    {
        text = "verheerenden Schaden an ";
    }
    System.sleep(5);
    sendChat("character|" + src_id, "/em richtet " + text + getObj("character", trg_id).get('name') + " an.");
    if(!System.isAlive(trg_id)) return;
    if(hp < 0.25)
    {
        System.sleep(5);
        sendChat("character|" + trg_id, "/em kann sich nur noch schwer auf den Beinen halten.");
        return;
    }
    if(hp < 0.5)
    {
        System.sleep(5);
        sendChat("character|" + trg_id, "/em ist sichtlich angeschlagen.");
        return;
    }
};

System.shockKillText = function(trg_id)
{
    var tokens = findObjs({ _type: "graphic", _subtype: "token", represents: trg_id });
    System.sleep(5);
    sendChat("character|" + trg_id, "/em erleidet einen Schock. Sein Tod ist unvermeidbar.");
    tokens.forEach(item => {
        item.set("status_skull", true);
    });
};

//
System.killText = function(src_id, trg_id)
{
    var tokens = findObjs({ _type: "graphic", _subtype: "token", represents: trg_id });
    System.sleep(5);
    sendChat("character|" + src_id, "/em hat " + getObj("character", trg_id).get('name') + " getötet!");
    tokens.forEach(item => {
        item.set("status_skull", true);
        //turnoder.forEach(obj => {
        //    if(obj.id != item.get('_id'))
        //    {
        //        neworder.push(obj);
        //    }
        //});
    });
    //Campaign().set('turnorder', JSON.stringify(neworder));
};

//
System.dodgeText = function(src_id, trg_id)
{
    System.sleep(5);
    sendChat("character|" + trg_id, "/em ist " + getObj("character", src_id).get('name') + " ausgewichen!");
};

//
System.healText = function(src_id, trg_id, amount)
{
    var text = "kaum";
    if(src_id == trg_id)
    {
        System.sleep(5);
        sendChat("", "/desc Die Wunden von " + getObj("character", src_id).get('name') + " schließen sich.");
        return;
    }
    if(amount > 1000)
    {
        text = "ein wenig";
    }
    if(amount > 10000)
    {
        text = "wesentlich";
    }
    if(amount > 20000)
    {
        text = "viel";
    }
    if(amount > 35000)
    {
        text = "unglaublich viel";
    }
    System.sleep(5);
    sendChat("character|" + src_id, "/em versorgt die Wunden von " + getObj("character", trg_id).get('name') + ".");
    System.sleep(5);
    sendChat("character|" + trg_id, "/em fühlt sich " + text + " besser.");
};

//
System.updateHealthState = function(trg_id)
{
    var hp_obj = getObj("attribute", System.Database.Characters[trg_id]["HP"]);
    var hp = parseFloat(hp_obj.get('current')) / parseFloat(hp_obj.get('max'));
    if(hp > 0.9)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "gesund");
        return;
    }
    if(hp > 0.6)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "leicht verwundet");
        return;
    }
    if(hp > 0.3)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "leicht angeschlagen");
        return;
    }
    if(hp > 0.15)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "stark angeschlagen");
        return;
    }
    if(hp > 0.05)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "schwer verwundet");
        return;
    }
    if(hp <= 0.05)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "tödlich verwundet");
        return;
    }
    if(hp === 0)
    {
        getObj("attribute", System.Database.Characters[trg_id]["HealthState"]).set("current", "tod");
        return;
    }
};

//
System.handleChatInput = function(msg)
{
    if(msg.type !== 'api') return;
    //
    if(msg.content.indexOf("!copy") !== -1)
    {
        var params = msg.content.replace("!copy", "");
        var times = parseInt(params.substring(0, 1));
        var src_id = params.substring(2, params.length);
        if(isNaN(times)) {
            times = 1;
        }
        if(getObj("character", src_id))
        {
            var name = getObj("character", src_id).get("name");
            var count = 0
            if(/\d/.test(getObj("character", src_id).get("name")))
            {
                count = parseInt(name.substring(name.length - 1, name.length));
                if(isNaN(count))
                {
                    count = 0;
                }
            }
            while(times > count)
            {
                name = name.substring(0, name.length - 1) + times;
                times--;
                var copy = createObj("character", { name: name });
                System.initCharacter(copy);
                Object.keys(System.Database.Characters[src_id]).forEach(key => {
                    if(key !== "tokens")
                    {
                        var attr = getObj("attribute", System.Database.Characters[copy.get("_id")][key]);
                        attr.set({
                            current: getObj("attribute", System.Database.Characters[src_id][key]).get("current"),
                            max: getObj("attribute", System.Database.Characters[src_id][key]).get("max"),
                        });
                    }
                });
            }
        }
        return;
    }
    //
    if(msg.content.indexOf("!simplestrike") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!simplestrike(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        var wpn = getObj("attribute", System.Database.Characters[src_id]["WeaponName"]).get('current');
        var sure = JSON.parse(params[2]);

        sendChat("character|" + src_id, "/em führt mit " + wpn + " einen einfachen Angriff aus.");
        System.dealDamage(src_id, trg_id, 1, JSON.parse(getAttrByName(src_id, "MagicWeapon")), sure, false);
        return;
    }
    if(msg.content.indexOf("!complexstrike") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!complexstrike(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        var wpn = getObj("attribute", System.Database.Characters[src_id]["WeaponName"]).get('current');
        var sure = JSON.parse(params[2]);
        
        sendChat("character|" + src_id, "/em führt mit " + wpn + " einen schwierigen Angriff aus.");
        System.dealDamage(src_id, trg_id, 1, JSON.parse(getAttrByName(src_id, "MagicWeapon")), sure, true);
        return;
    }
    if(msg.content.indexOf("!attribute") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!attribute(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id');
        var rolls = [
            System.doubleRoll(20) + parseInt(getObj("attribute", System.Database.Characters[src_id][params[1] + "Val"]).get('current')),
            System.doubleRoll(20) + parseInt(getObj("attribute", System.Database.Characters[src_id][params[1] + "Val"]).get('current')),
            System.doubleRoll(20) + parseInt(getObj("attribute", System.Database.Characters[src_id][params[1] + "Val"]).get('current'))
        ];
        var result = true;
        var text = "<span style=\"color: #3c3;\">geschafft</span>";

        rolls.forEach(roll => {
            if(result)
            {
                if(parseInt(roll) <= 9)
                {
                    result = false;
                    text = "<span style=\"color: #f00;\">nicht geschafft</span>";
                }
            }
        });
        log("Rolls: [" + rolls[0] + "," + rolls[1] + "," + rolls[2] + "]");

        sendChat("character|" + src_id, "/direct \n<span style=\"font-size: 14px;\">" + getObj("character", src_id).get('name') + " führt eine Probe auf " + params[1] + " durch.\nDie Probe wurde " + text + ".");
        return;
    }
    if(msg.content.indexOf("!nightmare") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!nightmare(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id');
        var rolls = [
            System.doubleRoll(20),
            System.doubleRoll(20),
            System.doubleRoll(20)
        ];
        var result = true;
        var text = "<span style=\"color: #3c3;\">war erfolgreich</span>";

        rolls.forEach(roll => {
            if(result)
            {
                if(parseInt(roll) <= 9)
                {
                    result = false;
                    text = "<span style=\"color: #f00;\">schlug fehl</span>";
                }
            }
        });
        log("Rolls: [" + rolls[0] + "," + rolls[1] + "," + rolls[2] + "]");

        sendChat("character|" + src_id, "/direct \n<span style=\"font-size: 14px;\">" + getObj("character", src_id).get('name') + " wendet Albtraum an.\nEs " + text + ".");
        return;
    }
    if(msg.content.indexOf("!smallfire") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!smallfire(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id');
        var rolls = [
            System.doubleRoll(20),
            System.doubleRoll(20),
            System.doubleRoll(20)
        ];
        var result = true;
        var success = "<span style=\"color: #0f0;\">Er hat ein Feuer entzündet!";

        rolls.forEach(roll => {
            if(result)
            {
                if(parseInt(roll) < 8)
                {
                    result = false;
                    success = "<span style=\"color: #f00;\">Er konnte kein Feuer erzeugen.";
                }
            }
        });

        sendChat("character|" + src_id, "/direct \n<span style=\"font-size: 14px;\">" + getObj("character", src_id).get('name') + " versucht ein Feuer zu entzünden.\n" + success);
        return;
    }
    if(msg.content.indexOf("!shakeearth") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!shakeearth(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id');
        var rolls = [
            System.doubleRoll(20),
            System.doubleRoll(20),
            System.doubleRoll(20)
        ];
        var result = true;
        var success = "<span style=\"color: #0f0;\">Die Gegner haben die Balance verloren!";

        rolls.forEach(roll => {
            if(result)
            {
                if(parseInt(roll) < 8)
                {
                    result = false;
                    success = "<span style=\"color: #f00;\">Die Gegner konnten widerstehen.";
                }
                if(parseInt(roll) < 12)
                {
                    success = "<span style=\"color: #66f;\">Nur ein Gegner deiner Wahl verliert die Balance.";
                }
            }
        });

        sendChat("character|" + src_id, "/direct \n<span style=\"font-size: 14px;\">" + getObj("character", src_id).get('name') + " erschüttert die Erde.\n" + success);
        return;
    }
    if(msg.content.indexOf("!thunderstrike") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!thunderstrike(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        var sfx = findObjs({ _type: "jukeboxtrack", title: "Donnerschlag Spell Sound" })[0];
    
        sendChat("character|" + src_id, "/em führt Donnerschlag des Jägers aus.");
        System.dealDamage(src_id, trg_id, 2.5, true, false);
        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
        return;
    }
    if(msg.content.indexOf("!embrace") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!embrace(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        
        System.healTarget(src_id, trg_id);
        return;
    }
    if(msg.content.indexOf("!thunderblade") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!thunderblade(", "").split(",");
        if(!getObj("character", params[0]) || !getObj("character", params[1])) return;
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        var sfx = findObjs({ _type: "jukeboxtrack", title: "Donnerschlag Spell Sound" })[0];
        var atk = getObj("attribute", System.Database.Characters[src_id]["ATK"]),
            wpn = getObj("attribute", System.Database.Characters[src_id]["WeaponQuality"]),
            mag = getObj("attribute", System.Database.Characters[src_id]["MAG"]),
            def = getObj("attribute", System.Database.Characters[trg_id]["DEF"]);
        var dmg = 15 * parseInt(mag.get('current')) + (parseInt(atk.get('current')) + parseInt(wpn.get('current')) * 100) * 35 - 25 * parseInt(def.get('current'));
    
        sendChat("character|" + src_id, "/em führt Blitzklinge aus.");
        System.dealDamage(src_id, trg_id, 2.25, true, false, false, dmg);
        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
        return;
    }
    if(msg.content.indexOf("!lifewell") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!lifewell(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            trg_id = getObj("character", params[1]).get('_id');
        
        System.healTarget(src_id, trg_id);
        return;
    }
    if(msg.content.indexOf("!infernalimpact") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!infernalimpact(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            token  = getObj("graphic", params[1]);
        var page = token.get('_pageid');
        var x = token.get('left'),
            y = token.get('top');
        var tokens = findObjs({ _type: "graphic", _subtype: "token", _pageid: page}),
            targets = [];
        sendChat("character|" + src_id, "/em wirkt Infernaler Einchlag.");
        spawnFx(token.get('left'), token.get('top'), "nova-fire", token.get('_pageid'));
        tokens.forEach(item => {
            if(item.get('left') < x + 225 && item.get('left') > x - 225 &&
               item.get('top') < y + 225 && item.get('top') > y - 225 &&
               item.get('represents') !== src_id)
            {
                targets.push(item);
            }
        });
        targets.forEach(item => {
            System.dealDamage(src_id, item.get('represents'), 2.25, true, false, false);
        });
        return;
    }
    if(msg.content.indexOf("!heavenswipe") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!heavenswipe(", "").split(",");
        var caster = getObj("graphic", params[0]),
            token  = getObj("graphic", params[1]);
        if(!caster || !token) return;
        var page = token.get('_pageid');
        var x = token.get('left'),
            y = token.get('top');
        var tokens = findObjs({ _type: "graphic", _subtype: "token", _pageid: page}),
            targets = [];
        var src_id = caster.get('represents');
        sendChat("character|" + src_id, "/em wirkt Heaven Swipe.");
        tokens.forEach(item => {
            if(item.get('represents') !== src_id &&
               System.inArc(caster, token, item, 60, 210))
            {
                targets.push(item);
            }
        });
        targets.forEach(item => {
            if(System.dealDamage(src_id, item.get('represents'), 1.15, false, false, false) > 0) {
                spawnFx(item.get('left'), item.get('top'), "bomb-frost", item.get('_pageid'));
            }
        });
        return;
    }
    if(msg.content.indexOf("!lightray") !== -1)
    {
        var param = msg.content.substring(0, msg.content.length - 1).replace("!lightray(", "");
        var token  = getObj("graphic", param);
        var page = token.get('_pageid');
        var x = token.get('left'),
            y = token.get('top');
        var tokens = findObjs({ _type: "graphic", _subtype: "token", _pageid: page}),
            targets = [],
            damaged = 0,
            src_id = token.get('represents');
        sendChat("character|" + src_id, "/em wirkt Light Rays.");
        tokens.forEach(item => {
            if(item.get('left') < x + 210 && item.get('left') > x - 210 &&
               item.get('top') < y + 210 && item.get('top') > y - 210 &&
               item.get('represents') !== src_id)
            {
                targets.push(item);
            }
        });
        targets.forEach(item => {
            if(damaged < 3 && System.doubleRoll(100) < 45)
            {
                damaged += 1;
                if(System.dealDamage(token.get('represents'), item.get('represents'), 1.5, true, false, false))
                {
                    spawnFx(item.get('left'), item.get('top'), "bomb-holy", item.get('_pageid'));
                }
            }
        });
        return;
    }
    if(msg.content.indexOf("!flameofalf") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!flameofalf(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            token = getObj("graphic", params[1]);
        var trg_id = token.get('represents');
        var x = token.get('left'),
            y = token.get('top');
        
        sendChat("character|" + src_id, "/em wirkt Flamme der Alf.");
        System.healTarget(src_id, trg_id);
        spawnFxBetweenPoints({x: x, y: y}, {x: x, y: y - 1}, "breath-acid", token.get('_pageid'))
        return;
    }
    if(msg.content.indexOf("!spiritstrength") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!spiritstrength(", "").split(",");
        var src = getObj("character", params[0]),
            trg = getObj("character", params[1]);
        if(!src || !trg) return;
        var src_id = src.get('_id'),
            trg_id = trg.get('_id');
        
        sendChat("character|" + src_id, "/em wirkt Geisterstärkung auf " + trg.get('name') + ".");

        var atk_obj = getObj("attribute", System.Database.Characters[trg_id]["ATK"]);
        if(!atk_obj)
        {
            log("Couldn't find ATK-Object for trg_id.");
            return;
        }
        atk_obj.set({
            max: atk_obj.get('current'),
            current: parseInt(atk_obj.get('current')) * 2
        });
        System.sleep(5);
        sendChat("character|" + trg_id, "/em fühlt sich wesentlich stärker.");
        return;
    }
    if(msg.content.indexOf("!fortress") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!fortress(", "").split(",");
        var src = getObj("character", params[0]);
        if(!src) return;
        var src_id = src.get('_id');
        
        sendChat("character|" + src_id, "/em wirkt Festungsschild.");

        var def_obj = getObj("attribute", System.Database.Characters[src_id]["DEF"]);
        if(!def_obj)
        {
            log("Couldn't find DEF-Object for trg_id.");
            return;
        }
        def_obj.set({
            max: 1,
        });
        System.sleep(5);
        sendChat("character|" + src_id, "/em wird von einem magischen Schild umgeben.");
        return;
    }
    if(msg.content.indexOf("!thunderbolt") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!thunderbolt(", "").split(",");
        var src = getObj("character", params[0]),
            trg = getObj("character", params[1]);
        if(!src) return;
        sendChat("character|" + src.get('_id'), "/em wirkt Blitzstoß.");
        System.dealDamage(src.get('_id'), trg.get('_id'), 5, true, false, false);
        return;
    }
    if(msg.content.indexOf("!tornado") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!tornado(", "").split(",");
        var caster = getObj("graphic", params[0]),
            target = getObj("graphic", params[1]);
        if(!caster || !target) return;
        var cx = caster.get('left'),
            cy = caster.get('top'),
            x, y,
            a = Math.atan2(target.get('top') - cy, target.get('left') - cx),
            i = 1,
            tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: caster.get('_pageid')}),
            already = [],
            page = getObj("page", caster.get('_pageid')), cleanup = false;
        sendChat("character|" + caster.get('represents'), "/em wirkt Flammentornado.");
        var intID = setInterval(function() {
            x = cx + i * 70 * Math.cos(a);
            y = cy + i * 70 * Math.sin(a);
            spawnFx(x, y, "burn-fire", caster.get('_pageid'));
            tokens.forEach(item => {
                if(!_.contains(already, item.get('represents')) && System.isAlive(item.get('represents')))
                {
                    if(item.get('left') < x + 35 && item.get('left') > x - 35 && item.get('top') < y + 35 && item.get('top') > y - 35)
                    {
                        System.dealDamage(caster.get('represents'), item.get('represents'), 1.75, true, false, false);
                        already.push(item.get('represents'));
                    }
                }
            });
            if(i >= 5) cleanup = true;
            i++;
            if(cleanup) clearInterval(intID);
        }, 125);
    }
    if(msg.content.indexOf("!verrine") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!verrine(", "").split(",");
        var src = getObj("character", params[0]),
            trg = getObj("graphic", params[1]);
        if(!src || !trg) return;
        sendChat("character|" + src.get('_id'), "/em wirkt Verrine.");
        var dmg = System.dealDamage(src.get('_id'), trg.get('represents'), 1.1, true, false, false);
        if(dmg > 0)
        {
            spawnFx(trg.get('left'), trg.get('top'), "burn-death", trg.get('_pageid'));
            System.healTarget(src.get('_id'), src.get('_id'), dmg * 0.5);
        }
        return;
    }
    if(msg.content.indexOf("!awakendead") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!awakendead(", "").split(",");
        var src = getObj("character", params[0]),
            trg = getObj("graphic", params[1]);
        var tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: trg.get('_pageid')}),
            targets = [];
        var hp_obj;
        sendChat("character|" + src.get('_id'), "/em wirkt Tote erwecken.");
        spawnFx(trg.get('left'), trg.get('top'), "nova-death", trg.get('_pageid'));
        tokens.forEach(item => {
            if(System.getDistanceBetweenPoints(System.tokenToPoint(trg), System.tokenToPoint(item)) <= 300 && !System.isAlive(item.get('represents')) && item.get('name').indexOf("Untot") === -1)
            {
                targets.push(item);
            }
        });
        targets.forEach(item => {
            spawnFx(item.get('left'), item.get('top'), "burn-death", trg.get('_pageid'));
            hp_obj = getObj("attribute", System.Database.Characters[item.get('represents')]["HP"]);
            if(hp_obj)
            {
                hp_obj.set({ current: hp_obj.get('max') });
                item.set({
                    status_skull: false,
                    name: item.get('name').indexOf("kind") == -1 && item.get('name').indexOf("fräulein") == -1 ? "Untoter " + item.get('name') : "Untotes " + item.get('name')
                });
            }
        });
    }
    if(msg.content.indexOf("!schwarz") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!schwarz(", "").split(",");
        var src = getObj("character", params[0]),
            trg = getObj("graphic", params[1]);
        if(!src || !trg) return;
        sendChat("character|" + src.get('_id'), "/em wirkt Schwarzbrand.");
        var dmg = System.dealDamage(src.get('_id'), trg.get('represents'), 1.8, true, false, false);
        if(dmg > 0)
        {
            spawnFx(trg.get('left'), trg.get('top'), "burn-death", trg.get('_pageid'));
            System.healTarget(src.get('_id'), src.get('_id'), dmg * 0.75);
        }
        return;
    }
    if(msg.content.indexOf("!bigsword") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!bigsword(", "").split(",");
        var caster = getObj("graphic", params[0]),
            target = getObj("graphic", params[1]),
            sure = JSON.parse(params[2]);
        if(!caster || !target) return;
        var cx = caster.get('left'),
            cy = caster.get('top'),
            x, y,
            a = Math.atan2(target.get('top') - cy, target.get('left') - cx),
            i = 1,
            dmg = getAttrByName(caster.get('represents'), "ATK") * 30 + getAttrByName(caster.get('represents'), "MAG") * 20,
            tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: caster.get('_pageid')}),
            already = [],
            page = getObj("page", caster.get('_pageid')),
            cleanup = false,
            sfx;
        sfx = findObjs({ _type: "jukeboxtrack", title: "Monster Roar" })[0];
        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
        sendChat("character|" + caster.get('represents'), "/em schwingt sein gigantisches Flammen-Schwert.");
        var intID = setInterval(function() {
            clearInterval(intID);
            intID = setInterval(function() {
                x = cx + i * 70 * Math.cos(a);
                y = cy + i * 70 * Math.sin(a);
                spawnFx(x, y, "burn-fire", caster.get('_pageid'));
                tokens.forEach(item => {
                    if(!_.contains(already, item.get('represents')) && System.isAlive(item.get('represents')))
                    {
                        if(item.get('left') < x + 35 && item.get('left') > x - 35 && item.get('top') < y + 35 && item.get('top') > y - 35)
                        {
                            System.dealDamage(caster.get('represents'), item.get('represents'), 1.75, true, sure, false, dmg * (sure ? 2 : 1));
                            already.push(item.get('represents'));
                        }
                    }
                });
                if(i >= 5) cleanup = true;
                i++;
                if(cleanup)
                {
                    clearInterval(intID);
                    sfx = findObjs({ _type: "jukeboxtrack", title: "Sword Impact" })[0];
                    if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
                    intID = setInterval(function() {
                        sfx = findObjs({ _type: "jukeboxtrack", title: "Ground Break" })[0];
                        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
                        clearInterval(intID);
                    }, 500);
                }
            }, 75);
        }, 1000);
    }
    if(msg.content.indexOf("!firebreath") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!firebreath(", "").split(",");
        var src = getObj("graphic", params[0]),
            trg = getObj("graphic", params[1]);
        if(!src || !trg) return;
        var tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: src.get('_pageid')}),
            targets = [];
        tokens.forEach(item => {
            if(item !== src && System.inArc(src, trg, item, 60, 280) && !_.contains(targets, item.get('represents')) && System.isAlive(item.get('represents')))
            {
                targets.push(item.get('represents'));
            }
        });
        sendChat("character|" + src.get('represents'), "/em wirkt Feuer Atem.");
        spawnFxBetweenPoints({x: src.get('left'), y: src.get('top')}, {x: trg.get('left'), y: trg.get('top')}, "breath-fire", src.get('_pageid'));
        targets.forEach(item => {
            System.dealDamage(src.get('represents'), item, 1 + 1/3, true, false, false);
        });
    }
    if(msg.content.indexOf("!sinferno") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!sinferno(", "").split(",");
        var caster = getObj("graphic", params[0]);
        if(!caster) return;
        var cx = caster.get('left'),
            cy = caster.get('top'),
            x, y,
            i = 1,
            tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: caster.get('_pageid')}),
            already = [],
            page = getObj("page", caster.get('_pageid')), cleanup = false;
        sendChat("character|" + caster.get('represents'), "/em wirkt Inferno.");
        var intID = setInterval(function() {
            for(var j = 1; j < 12; j++)
            {
                if(j % 3 === 0) continue;
                x = cx + i * 70 * Math.cos(j * Math.PI / 6);
                y = cy + i * 70 * Math.sin(j * Math.PI / 6);
                spawnFx(x, y, "burn-fire", caster.get('_pageid'));
                tokens.forEach(item => {
                    if(!_.contains(already, item.get('represents')) && System.isAlive(item.get('represents')))
                    {
                        if(item.get('left') < x + 35 && item.get('left') > x - 35 && item.get('top') < y + 35 && item.get('top') > y - 35)
                        {
                            System.dealDamage(caster.get('represents'), item.get('represents'), 1.5, true, true, false);
                            already.push(item.get('represents'));
                        }
                    }
                });
                if(x < 0 || x > parseInt(page.get('width')) * 70 || y < 0 || y > parseInt(page.get('height')) * 70) cleanup = true;
            }
            i++;
            if(cleanup) clearInterval(intID);
        }, 125);
    }
    if(msg.content.indexOf("!scythe") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!scythe(", "").split(",");
        var caster = getObj("graphic", params[0]),
            target = getObj("graphic", params[1]);
        if(!caster || !target) return;
        var x1 = caster.get('left'),
            x2 = target.get('left'),
            y1 = caster.get('top'),
            y2 = target.get('top'),
            r;
        var angle = Math.atan2(y2 - y1, x2 - x1);
        var deg = 60;
        var effect = createObj("graphic", {
            _subtype: "token",
            _pageid: target.get('_pageid'),
            left: x1 + 165 * Math.cos(angle + System.toRad(deg)),
            top: y1 + 160 * Math.sin(angle + System.toRad(deg)),
            width: 321.75,
            height: 312,
            rotation: System.translateAngle(System.toDeg(Math.PI / 2 + angle) + deg + 27.65),
            layer: "objects",
            isdrawing: true,
            imgsrc: "https://s3.amazonaws.com/files.d20.io/images/65359939/oUqyK-W_JFcFzJ9gcMUGLA/thumb.png?1540145561"
        });
        var sfx = findObjs({ _type: "jukeboxtrack", title: "Demon Laugh" })[0];
        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
        var intID = setInterval(function() {
            if(deg <= -60) {
                clearInterval(intID);
                effect.remove();
            }
            deg -= 5;
            x2 = x1 + 165 * Math.cos(angle + System.toRad(deg));
            y2 = y1 + 160 * Math.sin(angle + System.toRad(deg));
            r = System.toDeg(Math.PI / 2 + angle) + deg + 27.65;
            effect.set({
                left: x2,
                top: y2,
            });
            effect.set("rotation", r);
            spawnFx(x1 + 280 * Math.cos(angle + System.toRad(deg)), y1 + 270 * Math.sin(angle + System.toRad(deg)), "glow-charm", caster.get('_pageid'));
        }, 50);
        var src_id = caster.get('represents');
        var tokens = findObjs({ _type: "graphic", _subtype: "token", _pageid: caster.get('_pageid')}),
            targets = [];
        sendChat("character|" + src_id, "/em wirkt Feuersense.");
        tokens.forEach(item => {
            if(item.get('represents') !== src_id &&
               System.inArc(caster, target, item, 120, 290) &&
               !_.contains(targets, item.get('represents')) &&
               System.isAlive(item.get('represents')))
            {
                targets.push(item.get('represents'));
            }
        });
        targets.forEach(item => {
            System.dealDamage(src_id, item, 2.15, true, false, false);
        });
    }
    if(msg.content.indexOf("!inferno") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!inferno(", "").split(",");
        var caster = getObj("graphic", params[0]);
        if(!caster) return;
        var cx = caster.get('left'),
            cy = caster.get('top'),
            x, y,
            i = 1,
            tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: caster.get('_pageid')}),
            already = [],
            page = getObj("page", caster.get('_pageid')), backwards = false;
        sendChat("character|" + caster.get('represents'), "/em wirkt True Inferno.");
        var intID = setInterval(function() {
            for(var j = 1; j < 12; j++)
            {
                if(j % 3 === 0) continue;
                x = cx + i * 70 * Math.cos(j * Math.PI / 6);
                y = cy + i * 70 * Math.sin(j * Math.PI / 6);
                spawnFx(x, y, "burn-charm", caster.get('_pageid'));
                tokens.forEach(item => {
                    if(!_.contains(already, item.get('represents')) && System.isAlive(item.get('represents')))
                    {
                        if(item.get('left') < x + 35 && item.get('left') > x - 35 && item.get('top') < y + 35 && item.get('top') > y - 35)
                        {
                            System.dealDamage(caster.get('represents'), item.get('represents'), 0.95, true, true, false);
                            already.push(item.get('represents'));
                        }
                    }
                });
                if(x < 0 || x > parseInt(page.get('width')) * 70 || y < 0 || y > parseInt(page.get('height')) * 70)
                {
                    backwards = true;
                    already = [];
                }
            }
            if(backwards) i--;
            else i++;
            if(i === 0)
            {
                clearInterval(intID);
            }
        }, 125);
    }
    if(msg.content.indexOf("!hellfirerain") !== -1)
    {
        var params = msg.content.substring(0, msg.content.length - 1).replace("!hellfirerain(", "").split(",");
        var src_id = getObj("character", params[0]).get('_id'),
            token  = getObj("graphic", params[1]);
        var page = token.get('_pageid');
        var x = token.get('left'),
            y = token.get('top');
        var tokens = findObjs({ _type: "graphic", _subtype: "token", layer: "objects", _pageid: page}),
            targets = [],
            already = [],
            sfx = findObjs({ _type: "jukeboxtrack", title: "Hellfire Rain" })[0];
        if(sfx) sfx.set({ playing: true, softstop: false, loop: false });
        sendChat("character|" + src_id, "/em wirkt Hellfire Rain.");
        tokens.forEach(item => {
            if(item.get('left') < x + 210 && item.get('left') > x - 210 &&
               item.get('top') < y + 210 && item.get('top') > y - 210 &&
               item.get('represents') !== src_id &&
               !_.contains(targets, item) &&
               System.isAlive(item.get('represents')))
            {
                targets.push(item);
            }
        });
        var i = 0, x, y;
        var intID = setInterval(function() {
            targets.forEach(item => {
                if(i > 20)
                {
                    if(!_.contains(already, item.get('represents')))
                    {
                        if(System.dealDamage(src_id, item.get('represents'), 1.15, true, false, false) > 0)
                        {
                            spawnFx(item.get('left'), item.get('top'), "burn-charm", page);
                        }
                        already.push(item.get('represents'));
                    }
                }
                else
                {
                    x = item.get('left') - 0.5 * (300 - i * 15);
                    y = item.get('top') + 0.5 * (300 - i * 15);
                    spawnFx(x, y, "missile-charm", page);
                }
            });
            if(i > 20) clearInterval(intID);
            i++;
        }, 30);
        return;
    }
};
