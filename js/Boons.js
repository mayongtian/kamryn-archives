/**
 * list of ALL the class boons, race traits, etc in the game (will be verrry long)
 * 
 * They are not organised yet but I plan to organise by type (Action, Passive or just Boon) and then by alphabetical order
 */

// Actions first; Actions have AP costs.
const HumanDetermination = new Action(
    "Human Determination",
    "Once on your turn until your next rest, return back to consciousness if you are knocked unconscious, automatically pass your death saves if you are doing them, or deal double damage for a single turn.",
    0
);

const TrueGrit = new Action("True Grit", 
    "Once per long rest, spend 2 action points to reduce the damage you take by half until your next turn.",
    false,
    2
);

const Oath = new Action(
    "Oath", 
    "Once per combat you may expend healing equal to a quarter of your maximum hit points. This effect cannot heal more than 15 hit points.",
    false,
    0
);

// boons with both a passive and an active component (have mercy please josh) are referred to with an A or a P after the name.
const PledgeA = new Action(
    "PledgeA",
    "Once per combat you may expend healing equal to a quarter of your maximum hit points. This effect cannot heal more than 25 hit points.",
    false,
    0
);

const Faith = new Action(
    "Faith", 
    "Once per combat rotation, if you are struck, reduce the damage you take by 1d6.",
    true,
    0
);

const ShieldOfFaithful = new Action("Shield of the Faithful",
    "When you take damage, heal yourself for 1d4 hit points.",
    true,
    0
);

const Haste = new Action(
    "Haste",
    " Increase your movement by an extra 5 metres during your turn when approaching or attacking a creature. Grant +1 to hits when attacking with Power or Speed weapons when this boon is active.",
    false,
    0
);

// Passives; they apply a function to the stats f(p) where p is a Charactr object
const Adaptable = new Passive(
    "Adaptable",
    "Gain an extra point to spend on any Non-Combat stat and any In-Combat stat every 4 levels.",
    function(p){p.nonCombatPoints += level / 4}
);

const FeyAncestry = new Passive(
    "Fey Ancestry",
    "You have an advantage on saving throws that are magically trying to charm you. Additionally, you cannot be put to sleep by magic.",
    function(p){
        p.advantages.push("Charmed");
        p.immunities.push("Sleep");
    }
);

const DwarvishResistance = new Passive("Dwarvish Resistance",
    "Gain +1 to constitution and resistance to poison damage.",
    function(p){
        p.resistances.push("Poisoned");
        p.con += 1;
    }
);

const PledgeP = new Passive(
    "PledgeP",
    "Gain an additional +2 hit points.",
    function(p){p.hp += 2}
);

const TankFortitude = new Passive(
    "Tank Fortitude",
    "Gain an extra 4 hit points at level 1 and again at every level multiple of 4.",
    function(p){p.hp += 1 + p.level / 4}
);

const WarriorInitiative = new Passive(
    "Warrior's Tradition",
    "Gain +1 to any combat statistic.",
    function(p){p.inCombatPoints += 1}
);

const TakingArms = new Passive(
    "Taking Arms",
    "Gain +1 to AC",
    (p)=>p.AC++
);

// boons; these just say words lol
const MeditativeTrance = new Boon(
    "Meditative Trance",
    "Whenever you rest, regain a fifth of your hit points in exchange for always keeping watch. You cannot be surprised during rests."
);

const OriginSaundara = new Boon(
    "Origin of Saundara", "An ability with an unknown function."
);

const OriginSacraeta = new Boon(
    "Origin of Sacraeta", "An ability with an unknown function."
);

const OriginDenavat = new Boon(
    "Origin of Dennavat", "An ability with an unknown function."
);

const Chase = new Boon(
    "Chase", 
    "Increase your movement by 5 metres during your turn when approaching or attacking a creature."
);