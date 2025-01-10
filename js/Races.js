
//making the races
const emptyRace = new Race("", "", []);
// removes emptyRace from allRaces
Race.allRaces.pop();

const Human = new Race(
    "Human", 
    "Being the first sentient beings on Halesard, Humans were created in the likeness of humankind, and in God's image.Humans have had a troubled history, one often fraught with despair and bloodshed, being responsible for some of the earliest wars and disputes. After the Awakening, the humans lead the path of the crusades, resulting in bloodshed of an unimaginable scale.",
    [Adaptable, HumanDetermination, OriginSaundara]
);

const Elf = new Race(
    "Elf",
    "Created after Humans, Elves naturally became the second choice for God, as he had created them before. Like Humans, their history has been fraught with ceaseless war, usually not at their own fault. Nevertheless, the Elves persevered and became a powerful race, that even participated in the crusades as a joint coalition army, destroying those who opposed the Disciples of Kamryn",
    [MeditativeTrance, FeyAncestry, OriginSacraeta]
);

const Dwarf = new Race(
    "Dwarf",
    "Created to perfect the trifecta, the Dwarves were given the name Dennavat as the third race to be created within Halesard. Master forgers and workers, the Dwarves created several homes for themselves, and spread themselves greatly throughout the North Western reaches of Halesard. They managed to avoid the ire of the Humans and Elves, especially during the Dark Times, and thus still remain a strong power today.",
    [TrueGrit, DwarvishResistance, OriginDenavat]
);