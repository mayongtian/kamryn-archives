

// some const variables
const BASE_OUT_COMBAT_POINTS = 40;
const BASE_AC = 9;
const RACES = [];

// character stuff and point allocations
var name = "player";
var level = 1;
var spellList = 0;
var playerClass;
var inCombatPoints = 0;
var outCombatPoints = 0;
var ac = 9
var initiative = 0;

// some more player stuff
var playerArmour;

// out of combat abilities
var str = 0;
var dex = 0;
var con = 0;
var wis = 0;
var int = 0;
var cha = 0;

// in combat abilities
var pow = 0;
var spd = 0; // speed
var fin = 0;
var prs = 0;
var spw = 0; // spellworking

// skills
var pPerception = 0;

// some object structures
class race{
    bonusNonCom = [0, 0, 0, 0, 0, 0];
    bonusInCom = [0, 0, 0, 0, 0, 0];
    skills = [];
}

class item{
    name = "";
    rarity = 0;
    weight;
    
    item(name, rarity, weight){
        name = name;
        rarity = rarity;
        weight = weight;
    }
}

class weapon extends item{
    dmgDice;
    hitBonus;
    dmgBonus;

    weapon(name, rarity, weight, dice, hitBonus, dmgBonus){
        super(name, rarity, weight);
        this.dmgDice = dice;
        this.hitBonus = hitBonus;
        this.dmgBonus = dmgBonus;
    }
}

class armour extends item{
    type;
    acBonus = 0;
    armour(name, rarity, weight, type, acBonus){
        super(name, rarity, weight);
        this.type = type;
        this.acBonus = acBonus
    }
}

class spell{
    name;
    description;
    damage;
    spell(name, description, damage){
        this.name = name;
        this.description = description;
        this.damage = damage;
    }
}

// basic functions
/**
 * gets a modifier from an ability score (int)
 */
function modifier(abilityScore){
    return Math.round(abilityScore/4.0) + 1;
}

// calculating stats
inCombatPoints;
outCombatPoints = BASE_OUT_COMBAT_POINTS + 2 * (level - 1);
ac = playerArmour.acBonus + BASE_AC;

// 

// JSON file stuff