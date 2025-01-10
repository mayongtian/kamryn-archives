/**
 * database of Archetypes
 */

const Tank = new Archetype(
    "Tank",
    "Tanks are the main class that deal with front lining, absorbing damage and protecting their teammates. Tanks will often use Presence and Power in combat, alongside Constitution and Strength outside of combat.",
    TankFortitude,
    [0, 0, 9, 0, 0, 0]
);

const Warrior = new Archetype(
    "Warrior",
    "Warriors are typically the main source of consistent melee damage, as they have a plethora of different roles that they can take on. Typically, a warrior will use any combination of Power, Wit, Speed or Presence to get them in and out of situations. They also perform stronger with Dexterity, Strength and Intelligence.",
    WarriorInitiative,
    [9, 0, 0, 0, 0, 0]
);
