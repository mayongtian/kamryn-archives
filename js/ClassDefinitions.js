// this class is fucking massive lol idek how to deal with it
class Character{
    /** @type {String} */
    name = "";
    /** @type {String} */
    backstory = "";
    /** @type {Number} */
    level = 1;

    /** @type {Number} */
    nonCombatPoints = 60;
    /** @type {Number} */
    usedNonCombatPoints = 0;
    /** @type {Number} */
    inCombatPoints = 30;
    /** @type {Number} */
    usedInCombatPoints = 0;
    /** @type {Number} */
    wildAbilityPoints = 0;
    /** @type {Number} */
    usedWildAbilityPoints = 0;

    // in order of STR, DEX, CON, INT, WIS, CHA
    /** @type {Number[]} */
    nonCombatAbilities = [0, 1, 11, 3, 4, 5];
    /** @type {Number[]} */
    nonCombatAbilityBonuses = [0, 0, 0, 0, 0, 0];
    /** @type {Number[]} */
    nonCombatAbilityModBonuses = [0, 0, 0, 0, 0, 0];

    // in order of POW, SPE, FIN, WIT, PRE, SPL
    /** @type {Number[]} */
    inCombatAbilities = [0, 1, 2, 3, 10, 11];
    /** @type {Number[]} */
    inCombatAbilityBonuses = [0, 0, 0, 0, 0, 0];
    /** @type {Number[]} */
    inCombatAbilityModBonuses = [0, 0, 0, 0, 0, 0];

    /** @type {Number} */
    AC = 9;
    /** @type {Number} */
    inititiative = 0;
    /** @type {Number} */
    pasPerception = 10;
    /** @type {Number} */
    movespeed = 10
    
    /** @type {Number} */
    hp = 40; //FIXME whats the formula again
    /** @type {Number} */
    currenthp = 23;
    /** @type {Number} */
    successDeathSaves = 0;
    /** @type {Number} */
    failedDeathSaves = 0;

    /** @type {Array} */
    statusEffects = [];
    advantages = [];
    disadvantages = [];
    resistances = [];
    immunities = [];

    /** @type {Race} */
    race = emptyRace;

    /** @type {Map<Number, SubArchetype>} */
    archetypes = new Map(); // map of level : subarchetype boon chosen
    /** @type {Boolean} */
    isSpellcaster = false;
    /** @type {Boolean} */
    isEnchanter = false;

    /** @type {Boon[]} */
    boonList = []; // list of all boons: boonList is looped through at the end of character creation to make the other stuff
    /** @type {Map<Number, Action[]>} */
    actions = new Map() // map of ap cost : action trait
    /** @type {Action[]} */
    reactions = new Map() // map of ap cost : reaction trait
    /** @type {Passive[]} */
    passiveList = [];
    spellList = [];
    itemList = [];
    enchantmentList = [];

    // modifier stuff
    
    /**
     * calculates a modifier of the ability associated with the code index (from 0 to 5)
     * @param {Number} abilityIdx
     * @returns {Number}
     */
    nonCombatModifier(abilityIdx){
        let base = this.nonCombatAbilities[abilityIdx] + this.nonCombatAbilityBonuses[abilityIdx];
        let mod = this.nonCombatAbilityModBonuses[abilityIdx];
        return Math.round(base * 3 / 16.0) + mod;
    }

    /**
     * 
     * @param {Number} abilityIdx 
     * @returns {Number}
     */
    inCombatModifier(abilityIdx){
        let base = this.inCombatAbilities[abilityIdx] + this.inCombatAbilityBonuses[abilityIdx];
        let mod = this.inCombatAbilityModBonuses[abilityIdx];
        return Math.round(base * 3 / 16.0) + mod;
    }

    //setters

    setRace(race) {
        this.race = race;
    }
        
    setName(){
        p.name = document.getElementById("name-input").value;
        if(p.name != ""){
            document.getElementById("background-tab").setAttribute("complete", "t");
        }
        else{
            document.getElementById("background-tab").setAttribute("complete", "f");
        }
    }

    setHp(){
        let field = document.getElementById("current-hp");
        if(0 <= field.value && this.hp >= field.value){
            this.currenthp = field.value;
        }
        else{
            field.value = this.currenthp;
        }
    }

    setLevel(elem){
        if(0 <= elem.value && 60 >= elem.value){
            this.level = elem.value;
            for(let lv of this.archetypes.keys()){
                if(lv > this.level){
                    this.archetypes.delete(lv);
                }
            }
        }
        else{
            elem.value = this.level;
        }
        // reloads the archetypes tab
        let archElem = document.getElementById("archetypes");
        archElem.innerHTML = "Level";
        buildArchetypes();
    }

    setNonCombatAbility(abilityIdx){
        // updates used ability points
        this.usedNonCombatPoints -= this.nonCombatAbilities[abilityIdx];
        let newScore = parseInt(document.getElementById(`${NON_COMBAT_ABILITIES[abilityIdx]}-input`).value);
        // using noncombat points
        if(newScore <= this.nonCombatPoints - this.usedNonCombatPoints){
            this.nonCombatAbilities[abilityIdx] = newScore;
            this.usedNonCombatPoints += newScore;
            document.getElementById(`${NON_COMBAT_ABILITIES[abilityIdx]}-total`).innerHTML = newScore + this.nonCombatAbilityBonuses[abilityIdx];
            document.getElementById("noncombat-point-remaining").innerHTML = this.nonCombatPoints - this.usedNonCombatPoints;
        }
        // using wild points (this is untested)
        else if(this.nonCombatPoints + this.wildAbilityPoints >= this.usedNonCombatPoints + this.usedWildAbilityPoints + this.noncom){
            this.nonCombatAbilities[abilityIdx] = newScore;
            this.usedWildAbilityPoints += newScore - this.nonCombatPoints + this.usedNonCombatPoints
            this.usedNonCombatPoints = this.nonCombatPoints;
            document.getElementById("noncombat-point-remaining").innerHTML = this.nonCombatPoints - this.usedNonCombatPoints;
            document.getElementById("wild-point-remaining-nc").innerHTML = this.wildAbilityPoints - this.usedWildAbilityPoints;
        }
        // doing fuck all
        else{
            document.getElementById(`${NON_COMBAT_ABILITIES[abilityIdx]}-input`).value = this.nonCombatAbilities[abilityIdx];
            this.usedNonCombatPoints += this.nonCombatAbilities[abilityIdx];
        }
        setNcModifier(abilityIdx);
        nonCombatComplete();
    }

    setInCombatAbility(abilityIdx){
        // updates used ability points
        this.usedInCombatPoints -= this.inCombatAbilities[abilityIdx];
        let newScore = parseInt(document.getElementById(`${IN_COMBAT_ABILITIES[abilityIdx]}-input`).value);
        // if we are using inCombatPoints
        if(this.inCombatPoints - this.usedInCombatPoints - newScore >= 0){
            this.inCombatAbilities[abilityIdx] = newScore;
            this.usedInCombatPoints += newScore;
            document.getElementById("incombat-point-remaining").innerHTML = this.inCombatPoints - this.usedInCombatPoints;
        }
        // using wild points - broken
        else if(this.inCombatPoints + this.wildAbilityPoints >= this.usedInCombatPoints + this.usedWildAbilityPoints + this.noncom){
            this.inCombatAbilities[abilityIdx] = newScore;
            this.usedWildAbilityPoints += newScore - this.inCombatPoints + this.usedInCombatPoints
            this.usedInCombatPoints = this.inCombatPoints;
            document.getElementById("noncombat-point-remaining").innerHTML = this.inCombatPoints - this.usedInCombatPoints;
            document.getElementById("wild-point-remaining-nc").innerHTML = this.wildAbilityPoints - this.usedWildAbilityPoints;
        }
        // nothing changes
        else{
            document.getElementById(`${IN_COMBAT_ABILITIES[abilityIdx]}-input`).value = this.inCombatAbilities[abilityIdx];
            this.usedInCombatPoints += this.inCombatAbilities[abilityIdx];
        }
        setIcModifier(abilityIdx);
        inCombatComplete();
    }

    setAbilityPoints(){
        this.usedNonCombatPoints = 0;
        this.usedInCombatPoints = 0;
        this.usedWildAbilityPoints = 0;
        for(let i = 0; i < 6; i++){
            this.usedNonCombatPoints += this.nonCombatAbilities[i];
            this.usedInCombatPoints += this.inCombatAbilities[i];
        }
        document.getElementById("noncombat-point-remaining").innerHTML = this.nonCombatPoints - this.usedNonCombatPoints;
        document.getElementById("incombat-point-remaining").innerHTML = this.inCombatPoints - this.usedInCombatPoints;
    }
    
    setBackstory(){
        p.backstory = document.getElementById("backstory-input").value;
    }

    setArchetype(level, subArchetype){
        this.archetypes.set(level, subArchetype);
    }

    // getters
    /**
     * 
     * @returns {Archetype[]} list of all the archetypes held by player
     */
    getArchList(){
        let archList = [];
        for(let a of this.archetypes.values()){
            archList.push(a.parentArchetype);
        }
        return archList;
    }

    //loading stuff liek skills

    loadBoons(){
        this.boonList = [];
        for(let arch of this.getArchList()){
            this.boonList.push(arch.boon);
        }
        for(let [lv, arch] of this.archetypes.entries()){
            for(let b of arch.boons.get(lv)){
                this.boonList.push(b);
            }
        }
    }

    loadAction(i){
        if(i.isReaction){
            this.reactions.has(i.actionPointCost) ? this.reactions.get(i.actionPointCost).push(i) : this.reactions.set(i.actionPointCost, [i]);
        }
        else{
            this.actions.has(i.actionPointCost) ? this.actions.get(i.actionPointCost).push(i) : this.actions.set(i.actionPointCost, [i]);
        }
    }

    organiseBoons(){
        for(let i of this.boonList){
            if(i instanceof Action){
                this.loadAction(i);
            }
            else if(i instanceof Passive){
                this.passiveList.push(i);
            }
        }
    }

    /**
     * Applies all passive things in passive list
     */
    applyPassives(){

    }

    /**
     * this is super cringe :(
     * @param {JSONObject} obj 
     */
    constructor(obj){
        // makes a fresh character if we are starting from scratch
        if(undefined == obj){
            return;
        }

        // loads the fkin stupid object if we are loading an object
        this.AC = obj.AC;
        // getting actions
        this.actions = loadCharacterActions(obj.actions);
        this.advantages = obj.advantages;
        this.archetypes = loadCharacterArchetypes(obj.archetypes);
        this.backstory = obj.backstory;
        this.boonList = loadCharacterBoonList(obj.boonList);
        this.currenthp = obj.currenthp;
        // disadvantages dont exist yet
        this.disadvantages = obj.disadvantages;
        // enchantments dont exist yet
        this.enchantmentList = obj.enchantmentList;
        this.failedDeathSaves = obj.failedDeathSaves;
        this.hp = obj.hp;
        // nor do immunities
        this.immunities = obj.immunities;
        this.inCombatAbilities = obj.inCombatAbilities;
        this.inCombatAbilityBonuses = obj.inCombatAbilityBonuses;
        this.inCombatAbilityModBonuses = obj.inCombatAbilityModBonuses;
        this.inCombatPoints = obj.inCombatPoints;
        this.inititiative = obj.inititiative;
        // enchanters and spellcasters have nto been coded in yet
        this.isEnchanter = obj.isEnchanter;
        this.isSpellcaster = obj.isSpellcaster;
        this.itemList = obj.itemList;
        this.level = obj.level;
        this.movespeed = obj.movespeed;
        this.name = obj.name;
        this.nonCombatAbilities = obj.nonCombatAbilities;
        this.nonCombatAbilityBonuses = obj.nonCombatAbilityBonuses;
        this.nonCombatAbilityModBonuses = obj.nonCombatAbilityModBonuses;
        this.nonCombatPoints = obj.nonCombatPoints;
        this.pasPerception = obj.pasPerception;

        this.passiveList = loadCharacterBoonList(obj.passiveList);
        this.race = loadCharacterRace(obj.race);
        this.reactions = loadCharacterActions(obj.reactions);
        // these dont exist yet
        this.resistances = obj.resistances;
        this.spellList = obj.spellList;
        this.statusEffects = obj.statusEffects;
        
        this.successDeathSaves = obj.successDeathSaves;
        this.usedInCombatPoints = obj.usedInCombatPoints;
        this.usedNonCombatPoints = obj.usedNonCombatPoints;
        this.usedWildAbilityPoints = obj.usedWildAbilityPoints;
        this.wildAbilityPoints = obj.wildAbilityPoints;
    }
}

class Race{
    /** @type {Race[]} */
    static allRaces = [];
    /** @type {String} */
    name = "";
    /** @type {String} */
    description = "";
    /** @type {Boon[]} */
    boonList = [];
    getPassives(){
        let passiveList = [];
        for(let i of this.boonList){
            if(i instanceof Passive){
                passiveList.push(i);
            }
        }
        return passiveList;
    }

    /**
     * 
     * @param {String} name 
     * @param {String} description 
     * @param {Array<Boon>} boons 
     */
    constructor(name, description, boons) {
        this.name = name;
        this.description = description;
        this.boonList = boons;
        Race.allRaces.push(this);
    }
}

class Boon{
    static allBoons = [];
    /** @type {String} */
    name = "";
    /** @type {String} */
    description = "";
    /** @type {Boon[]} */
    replacedBoons = [];

    /**
     * @param {String} name 
     * @param {String} description
     * @param {Array<Boon>} replacedBoons
     */
    constructor(name, description, replacedBoons){
        if(replacedBoons != undefined){
            this.replacedBoons = replacedBoons;
        }
        this.name = name;
        this.description = description;
        Boon.allBoons.push(this);
    }
}

class Passive extends Boon{
    /** @param {Function(Character)} */
    effect;
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {function(Character)} effect 
     */
    constructor(name, description, effect, replacedBoons){
        super(name, description, replacedBoons);
        this.effect = effect;
    }
}

class Action extends Boon{
    /** @type {Boolean} */
    isReaction = false;
    /** @type {Number} */
    actionPointCost = 0;
    /**
     * 
     * @param {str} name
     * @param {str} description 
     * @param {boolean} isReaction 
     * @param {int} actionPointCost 
     */
    constructor(name, description, isReaction, actionPointCost, replacedBoons){
        super(name, description, replacedBoons);
        this.isReaction = isReaction;
        this.actionPointCost = actionPointCost;
    }
}

class Skill{
    name = "";
    description = "";
    effect;
    replacedSkill;
    
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {function(Character)} effect 
     * @param {Skill} replacedSkill 
     */
    constructor(name, description, effect, replacedSkill){
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.replacedSkill = replacedSkill;
    }
}

class Archetype{
    /** @type {Archetype[]} */
    static allArchetypes = [];
    /** @type {SubArchetype[]} */
    subArchetypes = [];
    /** @type {String} */
    name = "";
    /** @type {String} */
    description = "";
    /** @type {Boon} */
    boon;
    /** @type {Number[]} */
    threshold = [0, 0, 0, 0, 0, 0]; // list of noncombat ability base thresholds needed to level up class
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {* extends Boon} boon
     */
    constructor(name, description, boon, threshold){
        this.name = name;
        this.description = description;
        this.boon = boon;
        this.threshold = threshold;
        Archetype.allArchetypes.push(this);
    }

    getThreshold(level){
        let th = [0, 0, 0, 0, 0, 0];
        for(let i; i < 6; i ++){
            if(this.threshold[i] != 0){
                th[i] += level / 4;
            }
        }
        return th;
    }

    /**
     * 
     * @param {Character} p 
     * @param {Boon} boon
     */
    static replaceBoons(p, boon){
        for(let i = 0; i < p.boonList.length; i++){
            for(let j = 0; k<boon.replacedBoons.length; j++){
                if(p.boonList[i] == boon.replacedBoons[j]){
                    p.boonList.splice(i,1);
                }
            }
        }
    }
}

class SubArchetype{
    /** @type {String} */
    name = "";
    /** @type {String} */
    description = "";
    /** @type {Map<Number, Boon>} */
    boons;
    /** @type {Archetype} */
    parentArchetype;
    /**
     * 
     * @param {String} name 
     * @param {String} description 
     * @param {[Number, Boon[]]} boons
     * @param {Archetype} parentArchetype
     */
    constructor(name, description, parentArchetype, boons){
        this.name = name;
        this.description = description;
        this.parentArchetype = parentArchetype;
        this.boons = new Map(boons);
        this.parentArchetype.subArchetypes.push(this);
    }
}