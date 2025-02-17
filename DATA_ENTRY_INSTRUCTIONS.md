## Instructions
#### Cloning the Repository
Download GitHub. 

If you are on Mac/Linux, open up a terminal window and navigate to the directory where you want KA to be stored. Then type "git clone " + the cloning url from the repo.

If you are on Windows, get GitHub for Desktop and follow the instructions to clone the repository. 

You can now edit the classes using your choice of coding IDE (I like VScode).

#### Entering Data
Data is stored in the js folder;
- Archetypes in Archetypes.js e.g. Tank, Sorcerer
- SubArchetypes in SubArchetypes.js e.g. Paladin, Tinker
- Races in Races.js
- All racial traits, class boons, etc. belong in Boons.js

(I might change this to make it a bit easier to find, but later - i forgot why i had it like that and there might be a reason why.)

When adding a new object, go to the corresponding folder and follow the other entries. Every class boon or racial trait should be appended to Boons, in alphabetical order. 

All new objects should be const, and their names in UpperCamelCase.

#### Git Push
At the end of a data entry session, kindly push the repository so it can update. Put the things that were updated either in the description of the commit or in the corresponding session of README. Also in the tasks section of this doc. (Preferably do all of them but if you cbb please do one of them, so we can track what is happening easier).

#### Git Merging
The big hassle. In order to avoid this please ping in the kamryn-archives discord whenever you are doing data entry, and push right after. If you dont want to have to merge, kindly keep off the repo while someone else is editing it and do all that later. 

In the case that multiple people have edited the same document (i.e. Boons), Git will warn you about the conflicting versions and ask to merge. Just follow the instructions and use google at that point, idk what to do either lol

If you want to work on it concurrently we can do LiveShare. 

# Bugs
IF YOU CANT FIGURE OUT HOW TO IMPLEMENT A CERTAIN FEATURE @ ME. WE CAN FIGURE IT OUT TOGETHER.

# Tasks in Order of Priority
1. Develop Paladin up to lv 60
2. Develop Frontline Diver up to lv 60
3. Develop Knight up to lv 60
4. Add all the races in