# kamryn-archives
## Description
Kamryn Archives is a HTML-based local character builder for the Kamryn Chronicles TTRPG. This is a Floorbread Forge project.

## Usage notes

### File-Handling
Because of JavaScript's bullshit issues in handling files, the file will always be downloaded to your default download folder. It can be selected again to load (I think)
- that part of the code was lifted off of StackExchange so I'm honestly not sure how it reads the file, just that it works lol

### Actual Instructions
Open KamrynArchives.html. It will lead you to the right places. Don't mess with anything else.

## Architecture notes
### Tedious Data input
Since I want to outsource the stuff to friends I think I will have to make some sort of JSON file for each spell and write a python script.
But that makes the file wayyy too big so maybe I just make the python script write in JS and then copy-paste it in???
i dont want a js file that is 50000 lines tho :|

## Data Progress
- Spells are nonexistent
- The tank and warrior archetypes exist, nothing else
- only the paladin subarchetype exists, and only until level 12
- none of the passive effects (stat changes) exist
- equipment does not exist
- enchantments do not exist
- formatting is cringe

### Recruiting friends to help input missing Kamryn content into the file - I'll eventually write up a python script to aid with it

## Bugs
### File Handling
- Does not work yet - I'm working on making the json object actually translate into a player object
    - the problem appears to lie in the Maps - JSON does not appear to like maps.
### Builder
- The race selection accordions are doing something profoundly strange - check in with them ig
### Viewer
### General