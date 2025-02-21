/**
 * database of subarchetypes - expect this to be significantly longer than the other pages lol
 * 
 * bc paladin is mentioned in so many places I forgor to make it in Proper CamelCase - fix that later ig
 */

// tanks
const Paladin = new SubArchetype(
    "Paladin",
    "Focused on Holy magic and all sorts of healing, Paladins are great at soaking large amounts of damage whilst assisting allies.",
    Tank,
    [
        [1, [Oath]],
        [4, [PledgeA, PledgeP]],
        [8, [Faith]],
        [12, [ShieldOfFaithful]],
        [16, [ShieldOfUnbroken]],
        [20, [Guidance]],
        [24, [PaladinsVow]],
        [28, [Divinity]],
        [32, [HolyFire]],
        [36, [ShieldOfDivine]],
        [40, [HolyAura]],
        [44, [Apostleship]],
        [48, [TheLordsProtector]],
        [52, [HolyKinship]],
        [56, [MessengerForHeavensDivineFavour]],
        [60, [Ascension, TankAscension]]
    ]
);

const Knights = new SubArchetype(
    "Knights",
    "Being extremely tough to crack, with decent strikes, Knights are all about valour and armouring through their problems with their large AC gains and leadership on the battlefield.",
    Tank,
    [
        [1, [TakingArms]],
        [4, [PhysicalConditioning]],
        [8, [Restoration]],
        [12, [ArmourBearer]],
        [16, [ShieldBash]],
        [20, [DutyAndVigilance, KnightsVow]],
        [24, [AtWitsEnd]],
        [28, [GritAndPerseverance]],
        [32, [Intimidation]],
        [36, [Indomitable]],
        [40, [HonourAndValour, Shielding]],
        [44, [Indestructible]],
        [48, [KnightlyService]],
        [52, [Impervious]],
        [56, [Infallible]],
        [60, [Ascension, TankAscension]]
    ]
);

// warriors
const FrontlineDiver = new SubArchetype(
    "Frontline Diver",
    "Living completely for the thrill of it, Frontline Divers are daredevils who love to jump into danger head first, clearing the way and destroying higher priority targets.",
    Warrior,
    [
        [1, [Chase]],
        [4, [Haste]],
        [8, [Dive, Thrill]],
        [12, [Joy]],
        [16, [Quicken]],
        [20, [CutDown]],
        [24, [Surge]],
        [28, [Surrounded]],
        [32, [Trapped]],
        [36, [Relive]],
        [40, [Ecstasy]],
        [44, [RelentlessCharge]],
        [48, [FrenziedBloodthirst]],
        [52, [Irrationality]],
        [56, [BeyondDaring]],
        [60, [Ascension]]
    ]
);


const FrontlineDiver = new SubArchetype(
    "Frontline Diver",
    "Living completely for the thrill of it, Frontline Divers are daredevils who love to jump into danger head first, clearing the way and destroying higher priority targets.",
    Warrior,
    [
        [1, [Chase]],
        [4, [Haste]],
        [8, [Dive, Thrill]],
        [12, [Joy]],
        [16, [Quicken]],
        [20, [CutDown]],
        [24, [Surge]],
        [28, [Surrounded]],
        [32, [Trapped]],
        [36, [Relive]],
        [40, [Ecstasy]],
        [44, [RelentlessCharge]],
        [48, [FrenziedBloodthirst]],
        [52, [Irrationality]],
        [56, [BeyondDaring]],
        [60, [Ascension]]
    ]
);