/**
 * database of subarchetypes - expect this to be significantly longer than the other pages lol
 * 
 * bc paladin is mentioned in so many places I forgor to make it in Proper CamelCase - fix that later ig
 */

// tanks
const Paladin = new SubArchetype(
    "Paladin",
    "",
    Tank,
    [
        [1, [Oath]],
        [4, [PledgeA, PledgeP]],
        [8, [Faith]],
        [12, [ShieldOfFaithful]]
    ]
);

const Knight = new SubArchetype(
    "Knight",
    "",
    Tank,
    [
        [1, [TakingArms]]
    ]
);

// warriors
const FrontlineDiver = new SubArchetype(
    "Frontline Diver",
    "",
    Warrior,
    [
        [1, [Chase]],
        [4, [Haste]]
    ]
);