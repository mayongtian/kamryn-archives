/**
 * The goal of this document is to view a character once it has been loaded from a JSON source file. In the future, bonus shit may be applied for the sake of ease of use
 * the alpha version should only involve loading things in from a JSON doc into the correct format. 
 */


// some const variables
const BASE_OUT_COMBAT_ABILITY_POINTS = 40;
const BASE_AC = 9;

// classes and variables

/**
 * not sure about the naming but this is a module for all the classes and rules n shit in Kamryn
 */

// some object structures

class Character{
    name = "";
    backstory = "";
    level = 1;

    outCombatPoints = 0;
    usedOutCombatPoints = 0;
    inCombatPoints = 0;
    usedInCombatPoints = 0;
    wildAbiltyPonts = 0;
    usedWildAbilityPoints = 0;

    str = 10;
    dex = 11;
    con = 12;
    int = 13;
    wis = 14;
    cha = 15;

    pow = 15;
    spe = 14;
    fin = 13;
    wit = 12;
    pre = 11;
    spl = 10;

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

    race;

    archetypes = new Map(); // map of subarchetypes name : level
    isSpellcaster = false;
    isEnchanter = false;

    traitList = []; // list of all traits: traitList is looped through at the end of character creation to make the other stuff
    actionList = [];
    passiveList = [];
    spellList = [];
    itemList = [];
    enchantmentList = [];

    
    setBackstory(backstory){
        this.backstory = backstory;
    }

    setRace(race) {
        this.race = race;
        for(let i = 0; i < race.traitList.length; i++){
            this.traitList[this.traitList.length] = race.traitList[i];
        }
    }
    
    addArchetype(subArchetype, level){
        this.archetypes.set(subArchetype.name, level);
        this.traitList[this.traitList.length] = subArchetype.parentArchetype.boon;
        for(let [lv, traits] of subArchetype.boons){
            if(lv <= level){
                for(let j = 0; j < traits.length; j++){
                    this.traitList[this.traitList.length] = subArchetype.boons.get(lv)[j];
                }
            }
        }
    }

    organiseTraits(){
        for(let i = 0; i < this.traitList.length; i++){
            if(this.traitList[i] instanceof Action){
                this.actionList[this.actionList.length] = this.traitList[i];
            }
            else if(this.traitList[i] instanceof Passive){
                this.passiveList[this.passiveList.length = this.traitList[i]]
            }
        }
    }

    constructor(name, level, race){
        this.name = name;
        this.level = level;
        this.setRace(race);
    }
}

class Race{
    name = "";
    description = "";
    traitList = [];
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {Array<* extends Trait>} traits 
     */
    constructor(name, description, traits) {
        this.name = name;
        this.description = description;
        this.traitList = traits;
    }
}

class Trait{
    name = "";
    description = "";
    replacedTraits = [];

    /**
     * @param {str} name 
     * @param {str} description
     * @param {Array<Trait>} replacedTraits
     */
    constructor(name, description, replacedTraits){
        if(replacedTraits != undefined){
            this.replacedTraits = replacedTraits;
        }
        this.name = name;
        this.description = description;
    }
}

class Passive extends Trait{
    effect;
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {function(Character)} effect 
     */
    constructor(name, description, effect, replacedTraits){
        super(name, description, replacedTraits);
        this.effect = effect;
    }
}

class Action extends Trait{
    isReaction = false;
    actionPointCost = 0;
    /**
     * 
     * @param {str} name
     * @param {str} description 
     * @param {boolean} isReaction 
     * @param {int} actionPointCost 
     */
    constructor(name, description, isReaction, actionPointCost, replacedTraits){
        super(name, description, replacedTraits);
        this.isReaction = isReaction;
        this.actionPointCost = actionPointCost;
    }
}

class Archetype{
    name = "";
    description = "";
    boon;
    /**
     * 
     * @param {str} name 
     * @param {str} description 
     * @param {* extends Trait} boon
     */
    constructor(name, description, boon){
        this.name = name;
        this.description = description;
        this.boon = boon;
    }
    /**
     * 
     * @param {Character} p 
     * @param {* extends Trait} boon1 
     * @param {* extends Trait} boon2 
     */
    static replaceBoons(p, boon){
        for(let i = 0; i < p.traitList.length; i++){
            for(let j = 0; k<boon.replacedTraits.length; j++){
                if(p.traitList[i] == boon.replacedTraits[j]){
                    p.traitList.splice(i,1);
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
     * @param {Array<Array<int, Array<Trait>>>} boons
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
human = new Race(
    "Human", 
    "Being the first sentient beings on Halesard, Humans were created in the likeness of humankind, and in God’s image.Humans have had a troubled history, one often fraught with despair and bloodshed, being responsible for some of the earliest wars and disputes. After the Awakening, the humans lead the path of the crusades, resulting in bloodshed of an unimaginable scale.",
    [  
        adaptable = new Passive(
            "Adaptable",
            "Gain an extra point to spend on any Non-Combat stat and any In-Combat stat every 4 levels.",
            function(p){p.outCombatPoints += level / 4}
        ),
        humanDetermination = new Action(
            "Human Determination",
            "Once on your turn until your next rest, return back to consciousness if you are knocked unconscious, automatically pass your death saves if you are doing them, or deal double damage for a single turn.",
        ),
        OriginSaundara = new Trait("Origin of Saundara", "An ability with an unknown function.")
    ]
)

elf = new Race(
    "Elf",
    "Created after Humans, Elves naturally became the second choice for God, as he had created them before. Like Humans, their history has been fraught with ceaseless war, usually not at their own fault. Nevertheless, the Elves persevered and became a powerful race, that even participated in the crusades as a joint coalition army, destroying those who opposed the Disciples of Kamryn",
    [
        meditativeTrance = new Trait(
            "Meditative Trance",
            "Whenever you rest, regain a fifth of your hit points in exchange for always keeping watch. You cannot be surprised during rests."
        ),
        FeyAncestry = new Passive(
            "Fey Ancestry",
            "You have an advantage on saving throws that are magically trying to charm you. Additionally, you cannot be put to sleep by magic.",
            function(p){
                p.advantages[p.advantages.length] = "Charmed";
                p.immunities[p.immunities.length] = "Sleep";
            }
        ),
        OriinSacraeta = new Trait("Origin of Sacraeta", "An ability with an unknown function.")
    ]
)

dwarf = new Race(
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
                p.resistances[p.resistances.length] = "Poisoned";
                p.con += 1;
            }
        ),
        originDenavat = new Trait("Origin of Dennavat", "An ability with an unknown function.")
    ]
)

// making archetypes
tank = new Archetype(
    "Tank",
    "Tanks are the main class that deal with front lining, absorbing damage and protecting their teammates. Tanks will often use Presence and Power in combat, alongside Constitution and Strength outside of combat.",
    tankFortitude = new Passive(
        "Tank Fortitude",
        "Gain an extra 4 hit points at level 1 and again at every level multiple of 4.",
        function(p){p.hp += 1 + p.level / 4}
    )
)

// subarchetypes
paladin = new SubArchetype(
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
p.addArchetype(paladin, p.level);


// basic functions
/**
 * gets a modifier from an ability score (int)
 * @param {int} abilityScore
 * @returns {int}
 */
function modifier(abilityScore){
    return Math.round(abilityScore/4.0) + 1;
}

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
 * does all the stuff in runtime
 */
function init(){
    displayCharacter();
}

/**
 * displays the character stuff in the page - currently just the name
 */
function displayCharacter(){
    // displays name
    document.getElementById("character-name").innerHTML = p.name;

    // displays race
    document.getElementById("race").innerHTML = p.race.name;
    for(let [arch, level] of p.archetypes){
        addElement("span", `${arch} ${level}`, "title");
    }

    // noncombat abilities
    document.getElementById("str-score").innerHTML = p.str;
    document.getElementById("dex-score").innerHTML = p.dex;
    document.getElementById("con-score").innerHTML = p.con;
    document.getElementById("int-score").innerHTML = p.int;
    document.getElementById("wis-score").innerHTML = p.wis;
    document.getElementById("cha-score").innerHTML = p.cha;

    document.getElementById("str-mod").innerHTML = modifierStr(modifier(p.str));
    document.getElementById("dex-mod").innerHTML = modifierStr(modifier(p.dex));
    document.getElementById("con-mod").innerHTML = modifierStr(modifier(p.con));
    document.getElementById("int-mod").innerHTML = modifierStr(modifier(p.int));
    document.getElementById("wis-mod").innerHTML = modifierStr(modifier(p.cha));
    document.getElementById("cha-mod").innerHTML = modifierStr(modifier(p.cha));

    // combat abilities
    document.getElementById("pow-score").innerHTML = p.pow;
    document.getElementById("spe-score").innerHTML = p.spe;
    document.getElementById("fin-score").innerHTML = p.fin;
    document.getElementById("wit-score").innerHTML = p.wit;
    document.getElementById("pre-score").innerHTML = p.pre;
    document.getElementById("spl-score").innerHTML = p.spl;
    
    document.getElementById("pow-mod").innerHTML = modifierStr(modifier(p.pow));
    document.getElementById("spe-mod").innerHTML = modifierStr(modifier(p.spe));
    document.getElementById("fin-mod").innerHTML = modifierStr(modifier(p.fin));
    document.getElementById("wit-mod").innerHTML = modifierStr(modifier(p.wit));
    document.getElementById("pre-mod").innerHTML = modifierStr(modifier(p.pre));
    document.getElementById("spl-mod").innerHTML = modifierStr(modifier(p.spl));

    // battle stats
    document.getElementById("initiative").innerHTML = modifierStr(p.inititiative);
    document.getElementById("armour-class").innerHTML = p.AC;
    document.getElementById("passive-perception").innerHTML = p.pasPerception;
    document.getElementById("movement-speed").innerHTML = `${p.movespeed}m`

    // life stats
    document.getElementById("current-hp").setAttribute("value", p.currenthp);
    document.getElementById("current-hp").setAttribute("max", p.currenthp);
    document.getElementById("max-hp").innerHTML = `/ ${p.hp}`;

    //skills
    for(let t of p.traitList){
        addElement("dt", t.name, "skill-list", ["id", `${t.name}`]);
        addElement("dd", t.description, "skill-list", ["id", `${t.name}-description`]);
    }
}

/**
 * makes the tabs in the sidebar open
 */
function openTab(evt, tabName){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    tablinks=document.getElementsByClassName("tablink");
    for(i = 0 ; i < tablinks.length ; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
