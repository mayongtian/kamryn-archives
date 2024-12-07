/**
 * The goal of this document is to view a character once it has been loaded from a JSON source file. In the future, bonus shit may be applied for the sake of ease of use
 * the alpha version should only involve loading things in from a JSON doc into the correct format. 
 */


// some const variables
const BASE_OUT_COMBAT_ABILITY_POINTS = 40;
const BASE_AC = 9;

const NON_COMBAT_ABILITES = ["str", "dex", "con", "int", "wis", "cha"];

const IN_COMBAT_ABILITIES = ["pow", "spe", "fin", "wit", "pre", "spl"];

// classes and variables

/**
 * not sure about the naming but this is a module for all the classes and rules n shit in Kamryn
 */

// some object structures

// this class is fucking massive lol idek how to deal with it
class Character{
    name = "";
    backstory = "";
    level = 1;

    nonCombatPoints = 60;
    usedNonCombatPoints = 0;
    inCombatPoints = 30;
    usedInCombatPoints = 0;
    wildAbiltyPonts = 0;
    usedWildAbilityPoints = 0;

    // in order of STR, DEX, CON, INT, WIS, CHA
    nonCombatAbilities = [0, 1, 2, 3, 4, 5];
    nonCombatAbilityBonuses = [0, 0, 0, 0, 0, 0];
    nonCombatAbilityModBonuses = [0, 0, 0, 0, 0, 0];

    // in order of POW, SPE, FIN, WIT, PRE, SPL
    inCombatAbilities = [6, 7, 8, 9, 10, 11];
    inCombatAbilityBonuses = [0, 0, 0, 0, 0, 0];
    inCombatAbilityModBonuses = [0, 0, 0, 0, 0, 0];

    AC = 9;
    inititiative = 0;
    pasPerception = 10;
    movespeed = 10
    
    hp = 40; //FIXME whats the formula again
    currenthp = 23;
    successDeathSaves = 0;
    failedDeathSaves = 0;

    statusEffects = [];
    advantages = [];
    disadvantages = [];
    resistances = [];
    immunities = [];

    race = emptyRace;

    archetypes = new Map(); // map of level : subarchetype boon chosen
    archList = []; // list of subarchetypes
    isSpellcaster = false;
    isEnchanter = false;

    boonList = []; // list of all boons: boonList is looped through at the end of character creation to make the other stuff
    actions = new Map() // map of ap cost : action trait
    reactions = new Map() // map of ap cost : reaction trait
    passiveList = [];
    spellList = [];
    itemList = [];
    enchantmentList = [];

    // modifier stuff
    
    /**
     * calculates a modifier of the ability associated with the code index (from 0 to 5)
     * @param {int} abilityIdx
     * @returns {int}
     */
    nonCombatModifier(abilityIdx){
        let base = this.nonCombatAbilities[abilityIdx] + this.nonCombatAbilityBonuses[abilityIdx];
        let mod = this.nonCombatAbilityModBonuses[abilityIdx];
        return Math.round(base * 3 / 16.0) + mod;
    }

    /**
     * 
     * @param {int} abilityIdx 
     * @returns {int}
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

    setLevel(){
        let elem = document.getElementById("level-input");
        if(0 <= elem.value && 60 >= elem.value){
            this.level = elem.value;
        }
        else{
            elem.value = this.level;
        }
    }

    setNonCombatAbility(abilityIdx){
        // updates used ability points
        this.usedNonCombatPoints -= this.nonCombatAbilities[abilityIdx];
        let oldScore = this.nonCombatAbilities[abilityIdx];
        this.nonCombatAbilities[abilityIdx] = newScore;
        this.usedNonCombatPoints += newScore;
        return oldScore;
    }

    setInCombatAbility(abilityIdx){
        this.usedInCombatPoints -= this.inCombatAbilities[abilityIdx];
        oldScore = this.inCombatAbilities[abilityIdx];
        this.inCombatAbilities[abilityIdx] = newScore;
        this.usedInCombatPoints += newScore;
        return oldScore;
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

    addArchetype(level, subArchetype){
        if(!this.archList.includes(subArchetype)){
            this.archList.push(subArchetype);
        }
        this.archetypes.set(level, subArchetype);
    }

    //loading stuff liek skills

    loadBoons(){
        this.boonList = [];
        for(let arch of this.archList){
            this.boonList.push(arch.parentArchetype.boon);
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

    constructor(name, level, race){
        this.name = name;
        this.level = level;
        this.setRace(race);
    }
}

class Race{
    static allRaces = [];
    name = "";
    description = "";
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
     * @param {str} name 
     * @param {str} description 
     * @param {Array<* extends Boon>} boons 
     */
    constructor(name, description, boons) {
        this.name = name;
        this.description = description;
        this.boonList = boons;
        Race.allRaces.push(this);
    }
}

class Boon{
    name = "";
    description = "";
    replacedBoons = [];

    /**
     * @param {str} name 
     * @param {str} description
     * @param {Array<Boon>} replacedBoons
     */
    constructor(name, description, replacedBoons){
        if(replacedBoons != undefined){
            this.replacedBoons = replacedBoons;
        }
        this.name = name;
        this.description = description;
    }
}

class Passive extends Boon{
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
    isReaction = false;
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
    name = "";
    description = "";
    boon;
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
     * @param {* extends Boon} boon1 
     * @param {* extends Boon} boon2 
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
    name = "";
    description = "";
    boons;
    parentArchetype;
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {Map} boons
     * @param {Archetype} parentArchetype
     */
    constructor(name, description, parentArchetype, boons){
        this.name = name;
        this.description = description;
        this.parentArchetype = parentArchetype;
        this.boons = new Map(boons);
    }
}

//making the races
const emptyRace = new Race();
// removes emptyRace from allRaces
Race.allRaces.pop();

const human = new Race(
    "Human", 
    "Being the first sentient beings on Halesard, Humans were created in the likeness of humankind, and in God’s image.Humans have had a troubled history, one often fraught with despair and bloodshed, being responsible for some of the earliest wars and disputes. After the Awakening, the humans lead the path of the crusades, resulting in bloodshed of an unimaginable scale.",
    [  
        adaptable = new Passive(
            "Adaptable",
            "Gain an extra point to spend on any Non-Combat stat and any In-Combat stat every 4 levels.",
            function(p){p.nonCombatPoints += level / 4}
        ),
        humanDetermination = new Action(
            "Human Determination",
            "Once on your turn until your next rest, return back to consciousness if you are knocked unconscious, automatically pass your death saves if you are doing them, or deal double damage for a single turn.",
        ),
        OriginSaundara = new Boon("Origin of Saundara", "An ability with an unknown function.")
    ]
)

const elf = new Race(
    "Elf",
    "Created after Humans, Elves naturally became the second choice for God, as he had created them before. Like Humans, their history has been fraught with ceaseless war, usually not at their own fault. Nevertheless, the Elves persevered and became a powerful race, that even participated in the crusades as a joint coalition army, destroying those who opposed the Disciples of Kamryn",
    [
        meditativeTrance = new Boon(
            "Meditative Trance",
            "Whenever you rest, regain a fifth of your hit points in exchange for always keeping watch. You cannot be surprised during rests."
        ),
        FeyAncestry = new Passive(
            "Fey Ancestry",
            "You have an advantage on saving throws that are magically trying to charm you. Additionally, you cannot be put to sleep by magic.",
            function(p){
                p.advantages.push("Charmed");
                p.immunities.push("Sleep");
            }
        ),
        OriginSacraeta = new Boon("Origin of Sacraeta", "An ability with an unknown function.")
    ]
)

const dwarf = new Race(
    "Dwarf",
    "Created to perfect the trifecta, the Dwarves were given the name Dennavat as the third race to be created within Halesard. Master forgers and workers, the Dwarves created several homes for themselves, and spread themselves greatly throughout the North Western reaches of Halesard. They managed to avoid the ire of the Humans and Elves, especially during the Dark Times, and thus still remain a strong power today.",
    [
        trueGrit = new Action("True Grit", 
            "Once per long rest, spend 2 action points to reduce the damage you take by half until your next turn.",
            false,
            2
        ),
        dwarvishResistance = new Passive("Dwarvish Resistance",
            "Gain +1 to constitution and resistance to poison damage.",
            function(p){
                p.resistances.push("Poisoned");
                p.con += 1;
            }
        ),
        originDenavat = new Boon("Origin of Dennavat", "An ability with an unknown function.")
    ]
)

// making archetypes
const tank = new Archetype(
    "Tank",
    "Tanks are the main class that deal with front lining, absorbing damage and protecting their teammates. Tanks will often use Presence and Power in combat, alongside Constitution and Strength outside of combat.",
    tankFortitude = new Passive(
        "Tank Fortitude",
        "Gain an extra 4 hit points at level 1 and again at every level multiple of 4.",
        function(p){p.hp += 1 + p.level / 4}
    ),
    [0, 0, 9, 0, 0, 0]
)

// subarchetypes
const paladin = new SubArchetype(
    "Paladin",
    "",
    tank,
    [
        [1, [
                oath = new Action(
                    "Oath", 
                    "Once per combat you may expend healing equal to a quarter of your maximum hit points. This effect cannot heal more than 15 hit points.",
                    false,
                    0
                )
            ]
        ],
        [4, [
                pledge = new Action(
                    "Pledge",
                    "Once per combat you may expend healing equal to a quarter of your maximum hit points. This effect cannot heal more than 25 hit points.",
                    false,
                    0
                ),
                pledgeP = new Passive(
                    "Pledge",
                    "Gain an additional +2 hit points.",
                    function(p){p.hp += 2}
                )
            ]
        ],
        [
            8, [
                faith = new Action(
                    "Faith", 
                    "Once per combat rotation, if you are struck, reduce the damage you take by 1d6.",
                    true,
                    0
                )
            ]
        ],
        [
            12, [
                shieldOfFaithful = new Action("Shield of the Faithful",
                    "When you take damage, heal yourself for 1d4 hit points.",
                    true,
                    0
                )
            ]
        ]
    ]
)

// Snapshot of a character for bugtesting
const p = new Character("Jeff", 4, human);
p.addArchetype(1, paladin);
p.addArchetype(4, paladin);
p.loadBoons();
p.organiseBoons();


// basic functions

/**
 * @param {int} modifier 
 * @returns {str}
 */
function modifierStr(modifier){
    if(modifier < 0){
        return `-${modifier}`;
    }
    else{
        return `+${modifier}`;
    }
}

function setNcModifier(abilityIdx){
    document.getElementById(`${NON_COMBAT_ABILITES[abilityIdx]}-mod`).innerHTML = modifierStr(p.nonCombatModifier(abilityIdx));
}

function setIcModifier(abilityIdx){
    document.getElementById(`${IN_COMBAT_ABILITIES[abilityIdx]}-mod`).innerHTML = modifierStr(p.inCombatModifier(abilityIdx));
}

// JSON file stuff

// HTML things
/**
 * adds an element to the thing
 * @param {str} elementType
 * @param {str} innerHTML
 * @param {str} wrapperID
 * @param {[[str, str]]} attributes
 */
function addElement(elementType, innerHTML, wrapperID, attributes){
    let elem = document.createElement(elementType);
    if(attributes != undefined){
        for(let [attr, val] of attributes){
            elem.setAttribute(attr, val);
        }
    }
    elem.innerHTML = innerHTML;
    document.getElementById(wrapperID).appendChild(elem);
}

/**
 * makes the tabs in the sidebar open
 */
function openTab(evt, tabName){
    var tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(let i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    tablinks=document.getElementsByClassName("tablink");
    for(let i = 0 ; i < tablinks.length ; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * 
 * @param {PointerEvent} evt 
 * @param {String} accName id of content of accordion
 */
function openAccordion(evt, accName){
    // if it is active make it inactive
    if(document.getElementById(accName).style.display == "block"){
        evt.currentTarget.setAttribute("active", false);
        document.getElementById(accName).style.display = "none";
    }
    else{
        evt.currentTarget.setAttribute("active", "true");
        document.getElementById(accName).style.display = "block";
    }
}

// HTML stuff for character viewer

/**
 * does all the stuff in runtime for CharacterViewer
 */
function characterViewInit(){
    displayCharacter();
}

/**
 * displays the character stuff in the viewer page - currently just the name
 */
function displayCharacter(){
    // displays name
    document.getElementById("character-name").innerHTML = p.name;

    // displays race
    document.getElementById("race").innerHTML = p.race.name;

    // noncombat abilities
    document.getElementById("str-score").innerHTML = p.nonCombatAbilities[0];
    document.getElementById("dex-score").innerHTML = p.nonCombatAbilities[1];
    document.getElementById("con-score").innerHTML = p.nonCombatAbilities[2];
    document.getElementById("int-score").innerHTML = p.nonCombatAbilities[3];
    document.getElementById("wis-score").innerHTML = p.nonCombatAbilities[4];
    document.getElementById("cha-score").innerHTML = p.nonCombatAbilities[5];

    
    // combat abilities
    document.getElementById("pow-score").innerHTML = p.inCombatAbilities[0];
    document.getElementById("spe-score").innerHTML = p.inCombatAbilities[1];
    document.getElementById("fin-score").innerHTML = p.inCombatAbilities[2];
    document.getElementById("wit-score").innerHTML = p.inCombatAbilities[3];
    document.getElementById("pre-score").innerHTML = p.inCombatAbilities[4];
    document.getElementById("spl-score").innerHTML = p.inCombatAbilities[5];
    
    for(let i = 0; i < 6; i ++){
        setNcModifier(i);
        setIcModifier(i);
    }

    // battle stats
    document.getElementById("initiative").innerHTML = modifierStr(p.inititiative);
    document.getElementById("armour-class").innerHTML = p.AC;
    document.getElementById("passive-perception").innerHTML = p.pasPerception;
    document.getElementById("movement-speed").innerHTML = `${p.movespeed}m`

    // life stats
    document.getElementById("current-hp").setAttribute("value", p.currenthp);
    document.getElementById("current-hp").setAttribute("max", p.currenthp);
    document.getElementById("max-hp").innerHTML = `/ ${p.hp}`;

    //boons
    for(let t of p.race.boonList){
        addElement("dt", t.name, "race-traits", [["id", `${t.name}`]]);
        addElement("dd", t.description, "race-traits", [["id", `${t.name}-description`]]);
    }

    for(let t of p.boonList){
        addElement("dt", t.name, "boon-list", [["id", `${t.name}`]]);
        addElement("dd", t.description, "boon-list", [["id", `${t.name}-description`]]);
    }

    // actions
    console.log(p.actions);
    for(let [apCost, actionList] of p.actions.entries()){
        addElement("li", `${apCost} Action Points`, "action-list", [["id", `action-${apCost}-ap`]]);
        addElement("dl", "", `action-${apCost}-ap`, [["id", `action-${apCost}-ap-list`]]);
        for(let a of actionList){
            addElement("dt", a.name, `action-${apCost}-ap-list`, [[]]);
            addElement("dd", a.description, `action-${apCost}-ap-list`, [[]]);
        }
    }
    for(let[apCost, actionList] of p.reactions.entries()){
        addElement("li", `${apCost} Action Points`, "reaction-list", [["id", `reaction-${apCost}-ap`]]);
        addElement("dl", "", `reaction-${apCost}-ap`, [["id", `reaction-${apCost}-ap-list`]]);
        for(let a of actionList){
            addElement("dt", a.name, `reaction-${apCost}-ap-list`, [[]]);
            addElement("dd", a.description, `reaction-${apCost}-ap-list`, [[]]);
        }    }
}

// HTML stuff for character builder

/**
 * immediate runtime for characterBuilder
 */
function characterBuildInit(){
    // loading name and backstory
    document.getElementById("name-input").value = p.name;
    document.getElementById("background-input").value = p.backstory;

    // doing the race selection
    for(let r of Race.allRaces){
        addElement("button", r.name, "race", [["id", `${r.name}-accordion`], ["class", "accordion"], ["onclick", `openAccordion(event, '${r.name}-content')`]]);
        addElement("div", "", "race", [["id", `${r.name}-content`], ["active", "false"]]);
        addElement("p", r.description, `${r.name}-content`, [["id", `${r.name}-description`], ["class", "race-description"]]);
        addElement("dl", "", `${r.name}-content`, [["id", `${r.name}-boons`]]);
        for(let t of r.boonList){
            addElement("dt", t.name, `${r.name}-content`, [["id", `${r.name}-${t.name}`]]);
            addElement("dd", t.description, `${r.name}-content`, [["id", `${r.name}-${t.name}-description`]]);
        }
        addElement("button", "SELECT", `${r.name}-content`, [["id", `${r.name}-select`], ["class", "select-button"], ["onclick", `p.setRace(${r.name.toLowerCase()})`]])
    }

    // noncombat abilitites
    document.getElementById("noncombat-point-total").innerHTML = p.nonCombatPoints;
    document.getElementById("noncombat-point-remaining").innerHTML = p.nonCombatPoints - p.usedNonCombatPoints;
    document.getElementById("wild-point-total-nc").innerHTML = p.wildAbiltyPonts;
    document.getElementById("wild-point-remaining-nc").innerHTML = p.wildAbiltyPonts - p.usedWildAbilityPoints;
    document.getElementById("str-input").value = p.nonCombatAbilities[0];
    document.getElementById("dex-input").value = p.nonCombatAbilities[1];
    document.getElementById("con-input").value = p.nonCombatAbilities[2];
    document.getElementById("int-input").value = p.nonCombatAbilities[3];
    document.getElementById("wis-input").value = p.nonCombatAbilities[4];
    document.getElementById("cha-input").value = p.nonCombatAbilities[5];
    
    // combat 
    // * the fields for extra modifiers from boons have not been added yet
    document.getElementById("incombat-point-total").innerHTML = p.inCombatPoints;
    document.getElementById("incombat-point-remaining").innerHTML = p.inCombatPoints - p.usedInCombatPoints;
    document.getElementById("wild-point-total-ic").innerHTML = p.wildAbiltyPonts;
    document.getElementById("wild-point-remaining-ic").innerHTML = p.wildAbiltyPonts - p.usedWildAbilityPoints;
    document.getElementById("pow-input").value = p.inCombatAbilities[0];
    document.getElementById("spe-input").value = p.inCombatAbilities[1];
    document.getElementById("fin-input").value = p.inCombatAbilities[2];
    document.getElementById("wit-input").value = p.inCombatAbilities[3];
    document.getElementById("pre-input").value = p.inCombatAbilities[4];
    document.getElementById("spl-input").value = p.inCombatAbilities[5];

    for(let i = 0; i < 6; i ++){
        setNcModifier(i);
        setIcModifier(i);
    }
    p.setAbilityPoints();

    // archetypes
    document.getElementById("level-input").value = p.level;
}