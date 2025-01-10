// HTML stuff for character viewer

/**
 * does all the stuff in runtime for CharacterViewer
 */
function characterViewInit(){
    displayCharacter();
    naviMenu();
}

function resetViewer(){
    // i cant be fucked to work with this man
    document.body.innerHTML = `
    <script src = "js/Main.js"></script>
    <script src="js/ClassDefinitions.js"></script>
    <script src="js/Boons.js"></script>
    <script src="js/Races.js"></script>
    <script src="js/Archetypes.js"></script>
    <script src="js/SubArchetypes.js"></script>
    <script src="js/CharacterViewer.js"></script>
    <script src="js/CharacterBuilder.js"></script>
    <script src="js/TitleScreen.js"></script>

    <div id="title-block" class="title-block">
        <h1 id="character-name" class="heading">name</h1>
        <h2 id="title" class="subheading">
            <span id="race"> race </span>
        </h2>
    </div>
    <div id="body-block" class="body-block">
        <div id="column-1" class="column-1">
            <!-- Noncombat ability scores - top left -->
            <div id="noncombat-ability-score-block" class="ability-scores-block">
                <div id="str-score-block" class="ability-block-r1">
                    <h3>
                        STR
                    </h3>
                    <div id="str-score"></div>
                    <div id="str-mod"></div>
                </div>
                <div id="dex-score-block" class="ability-block-r1">
                    <h3>
                        DEX
                    </h3>
                    <div id="dex-score"></div>
                    <div id="dex-mod"></div>
                </div>
                <div id="con-score-block" class="ability-block-r1">
                    <h3>
                        CON
                    </h3>
                    <div id="con-score"></div>
                    <div id="con-mod"></div>
                </div>
                <div id="int-score-block" class="ability-block-r2">
                    <h3>
                        INT
                    </h3>
                    <div id="int-score"></div>
                    <div id="int-mod"></div>
                </div>
                <div id="wis-score-block" class="ability-block-r2">
                    <h3>
                        WIS
                    </h3>
                    <div id="wis-score"></div>
                    <div id="wis-mod"></div>
                </div>
                <div id="cha-score-block" class="ability-block-r2">
                    <h3>
                        CHA
                    </h3>
                    <div id="cha-score"></div>
                    <div id="cha-mod"></div>
                </div>
            </div>
            <!-- Combat ability scores - middle left-->
            <div id="combat-ability-score-block" class="ability-scores-block">
                <div id="pow-score-block" class="ability-block-r1">
                    <h3>
                        POW
                    </h3>
                    <div id="pow-score"></div>
                    <div id="pow-mod"></div>
                </div>
                <div id="spe-score-block" class="ability-block-r1">
                    <h3>
                        SPE
                    </h3>
                    <div id="spe-score"></div>
                    <div id="spe-mod"></div>
                </div>
                <div id="fin-score-block" class="ability-block-r1">
                    <h3>
                        FIN
                    </h3>
                    <div id="fin-score"></div>
                    <div id="fin-mod"></div>
                </div>
                <div id="wit-score-block" class="ability-block-r2">
                    <h3>
                        WIT
                    </h3>
                    <div id="wit-score"></div>
                    <div id="wit-mod"></div>
                </div>
                <div id="pre-score-block" class="ability-block-r2">
                    <h3>
                        PRE
                    </h3>
                    <div id="pre-score"></div>
                    <div id="pre-mod"></div>
                </div>
                <div id="spl-score-block" class="ability-block-r2">
                    <h3>
                        SPL
                    </h3>
                    <div id="spl-score"></div>
                    <div id="spl-mod"></div>
                </div>
            </div>
            <!-- languages, proficiencies, etc - bottom left -->
            <div id="language-text" class="proficiencies-block">
                <p>Languages</p>
            </div>
        </div>
        <div id="column-2" class="column-2">
            <!-- initiative, AC and movement speed - top middle -->
            <div id="battle-stats-r1" class="battle-stats-r1">
                <div id="initiative-block" class="battle-stat-block">
                    <h4>
                        Initiative
                    </h4>
                    <div id="initiative"></div>
                </div>
                <div id="AC-block" class="battle-stat-block">
                    <h4>
                        Armour Class
                    </h4>
                    <div id="armour-class"></div>
                </div>
                <div id="passive-perception-block" class="battle-stat-block">
                    <h4>
                        Passive Perception
                    </h4>
                    <div id="passive-perception"></div>
                </div>
                <div id="movement-block" class="battle-stat-block">
                    <h4>
                        Movement Speed
                    </h4>
                    <div id="movement-speed"></div>
                </div>
            </div>
            <div id="life-stats-r2" class="life-stats-r2">
                <!-- HP and death saves - second middle -->
                <div id="hp-block" class="life-stat-block">
                    <h4>
                        Hit Points
                    </h4>
                    <input id="current-hp" type="number" onchange="p.setHp()"><div id="max-hp"></div>
                </div>
                <div id="death-saves-block" class="life-stat-block">
                    <h4>
                        Death Saves
                    </h4>
                    <input class="success-save" type="checkbox">
                    <input class="success-save" type="checkbox">
                    <input class="success-save" type="checkbox">
                    <input class="failed-save" type="checkbox">
                    <input class="failed-save" type="checkbox">
                    <input class="failed-save" type="checkbox">
                </div>
            </div>
            <!-- passive perception and resistance/statuses - third middle -->  
            <div id="Status-effects-block" class="status-block">
                <h4>
                    Status Effects
                </h4>
            </div>
            <!-- action planner block for later progress - bottom middle -->
            <div id="action-planner-block" class="action-planner-block">
                <h4>
                    Action Planner
                </h4>
            </div>
        </div>
        <!-- sidebar :skull: -->
        <div id="sidebar-block" class="sidebar">
            <!-- the tabs at the top of the sidebar -->
            <div class="tab">
                <button class="tablink" onclick="openTab(event, 'actions')">
                    ACTIONS
                </button>
                <button class="tablink" onclick="openTab(event, 'spells')">
                    SPELLS
                </button>
                <button class="tablink" onclick="openTab(event, 'items')">
                    ITEMS
                </button>
                <button class="tablink" onclick="openTab(event, 'enchantments')">
                    ENCHANTMENTS
                </button>
                <button class="tablink" onclick="openTab(event, 'boons')">
                    BOONS
                </button>
                <button class="tablink" onclick="openTab(event, 'skills')">
                    SKILLS
                </button>
                <button class="tablink" onclick="openTab(event, 'misc')">
                    MISC
                </button>
            </div>
            <!-- Content of the tabs -->
            <div id="actions" class="tabcontent">
                <h3>
                    Reactions
                </h3>
                <ul id="reaction-list"></ul>
                <h3>
                    Actions
                </h3>
                <ul id="action-list"></ul>
            </div>
            <div id="spells" class="tabcontent">
                <h5>
                    6 Action Points...
                </h5>
            </div>
            <div id="items" class="tabcontent">
                <dl>
                    <dt>
                        Kwalishs abomination
                    </dt>
                    <dd>
                        legendary item does things idk
                    </dd>
                </dl>
            </div>
            <div id="enchantments" class="tabcontent">
                <dl>
                    <dt>
                        minor enchantment
                    </dt>
                    <dd>
                        does this
                    </dd>
                </dl>
            </div>
            <div id="boons" class="tabcontent">
                <h3>Racial Traits</h3>
                <dl id="race-traits"></dl>
                <h3>Archetype Boons</h3>
                <dl id="boon-list"></dl>
            </div>
            <div id="skills" class="tabcontent">
                <dl id="skill-list"></dl>
            </div>
            <div id="misc" class="tabcontent">
                <dl>
                    <dt>
                        This misc thing
                    </dt>
                    <dd>
                        does this
                    </dd>
                </dl>
            </div>
        </div>
    </div>`;
    document.getElementById("style").setAttribute("href", "css/characterViewer.css");
    characterViewInit();
    document.title = "Kamryn Archives - Character Viewer";
}

/**
 * displays the character stuff in the viewer page - currently just the name
 */
function displayCharacter(){
    // displays name
    document.getElementById("character-name").innerHTML = p.name;

    // displays race
    document.getElementById("race").innerHTML = p.race.name;

    // combat abilities
    for(let i = 0; i < 6; i ++){
        document.getElementById(`${NON_COMBAT_ABILITIES[i]}-score`).innerHTML = p.nonCombatAbilities[i];
        document.getElementById(`${IN_COMBAT_ABILITIES[i]}-score`).innerHTML = p.nonCombatAbilities[i];
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
        }
    }
}
