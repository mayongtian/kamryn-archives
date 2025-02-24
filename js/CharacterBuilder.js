/**
 * The goal of this document is to view a character once it has been loaded from a JSON source file. In the future, bonus shit may be applied for the sake of ease of use
 * the alpha version should only involve loading things in from a JSON doc into the correct format. 
 */

/**
 * 
 * @param {Element} elem 
 * @param {Race} race 
 */
function selectRace(elem, race){
    if(elem.innerHTML === "SELECT"){
        p.setRace(race);
        elem.setAttribute("active", "t");
        document.getElementById(`${race.name}-accordion`).setAttribute("active", "t");
        document.getElementById("race-tab").setAttribute("complete", "t");
        elem.innerHTML = "SELECTED";
    }
    for(r of Race.allRaces){
        if(r != race){
            document.getElementById(`${r.name}-select`).innerHTML = "SELECT";
            document.getElementById(`${r.name}-select`).setAttribute("active", "f");
            document.getElementById(`${r.name}-accordion`).setAttribute("active", "f");
        }
    }
}

function resetNonCombatAbilities(){
    let total = 0; // total noncombat points used
    for(let i = 0; i < NON_COMBAT_ABILITIES.length; i++){
        total += parseInt(document.getElementById(`${NON_COMBAT_ABILITIES[i]}-input`).value);
        p.nonCombatAbilities[i] = 0;
        document.getElementById(`${NON_COMBAT_ABILITIES[i]}-input`).value = 0;
        document.getElementById(`${NON_COMBAT_ABILITIES[i]}-total`).innerHTML = p.nonCombatAbilityBonuses[i];
        setNcModifier(i);
    }
    total -= p.usedNonCombatPoints;
    p.usedNonCombatPoints = 0;
    p.usedWildAbilityPoints -= total;
    document.getElementById("wild-point-remaining-nc").innerHTML = p.wildAbilityPoints - p.usedWildAbilityPoints;
    document.getElementById("noncombat-point-remaining").innerHTML = p.nonCombatPoints - p.usedNonCombatPoints;
}

function resetInCombatAbilities(){
    let total = 0; // total noncombat points used
    for(let i = 0; i < IN_COMBAT_ABILITIES.length; i++){
        total += parseInt(document.getElementById(`${IN_COMBAT_ABILITIES[i]}-input`).value);
        p.inCombatAbilities[i] = 0;
        document.getElementById(`${IN_COMBAT_ABILITIES[i]}-input`).value = 0;
        document.getElementById(`${IN_COMBAT_ABILITIES[i]}-total`).innerHTML = p.inCombatAbilityBonuses[i];
        setIcModifier(i);
    }
    total -= p.usedNonCombatPoints;
    p.usedInCombatPoints = 0;
    p.usedWildAbilityPoints -= total;
    document.getElementById("wild-point-remaining-ic").innerHTML = p.wildAbilityPoints - p.usedWildAbilityPoints;
    document.getElementById("incombat-point-remaining").innerHTML = p.inCombatPoints - p.usedNonCombatPoints;
}

/**
 * Runs every time something is changed in NonCombat Abilities to turn it green lol
 */
function nonCombatComplete(){
    elem = document.getElementById("noncombat-ability-tab");
    if(p.usedNonCombatPoints == p.nonCombatPoints){
        elem.setAttribute("complete", "t");
    }
    else{
        elem.setAttribute("complete", "f");
    }
}

/**
 * Runs every time something is changed in InCombat Abilities to turn it green lol
 */
function inCombatComplete(){
    elem = document.getElementById("incombat-ability-tab");
    if(p.usedInCombatPoints == p.inCombatPoints){
        elem.setAttribute("complete", "t");
    }
    else{
        elem.setAttribute("complete", "f");
    }
}

// HTML stuff for character builder
/**
 * immediate runtime for characterBuilder
 */
function characterBuildInit(){
    // loads p in
    let mode = sessionStorage.getItem("mode");
    if("0" == mode){
        p = new Character();
    }
    else if("1" == mode){
        let b = localStorage.getItem("character");
        if(b == null){
            console.log("something went wrong againnnnnn");
        }
        console.log(b);
        p = new Character(JSON.parse(localStorage.getItem("character")));
    }
    else if("2" == mode){
        
    }
    else{
        //spit error
        console.log("mode should not be ", mode);
    }
    // building name and backstory
    buildName();
    buildBackstory();

    // doing the race selection
    buildRaces();

    // noncombat abilitites
    buildNCAbilities();
    
    // combat 
    // * the fields for extra modifiers from boons have not been added yet @TODO
    buildICAbilities();

    // sets modifiers
    for(let i = 0; i < 6; i ++){
        setNcModifier(i);
        setIcModifier(i);
    }
    p.setAbilityPoints();

    // archetypes
    buildArchetypes();
    
    naviMenu();
    console.log("done?");
}

// diplay funcitons
function buildName(){
    document.getElementById("name-input").value = p.name;
    if(p.name != ""){
        document.getElementById("background-tab").setAttribute("complete", "t");
    }
}

function buildBackstory(){
    document.getElementById("background-input").value = p.backstory;
}

function buildRaces(){
    for(let r of Race.allRaces){
        let selected = "SELECT"
        let isActive = "f";
        if(p.race == r){
            selected = "SELECTED";
            isActive = "t";
            document.getElementById("race-tab").setAttribute("complete", "t");
        }
        addElement("button", r.name, "race", [["id", `${r.name}-accordion`], ["class", "accordion"], ["onclick", `openAccordion('${r.name}-content')`], ["active", isActive]]);
        addElement("div", "", "race", [["id", `${r.name}-content`], ["class", "accordion-content"]]);
        addElement("p", r.description, `${r.name}-content`, [["id", `${r.name}-description`], ["class", "race-description"]]);
        addElement("dl", "", `${r.name}-content`, [["id", `${r.name}-boons`]]);
        for(let t of r.boonList){
            addElement("dt", t.name, `${r.name}-content`, [["id", `${r.name}-${t.name}`]]);
            addElement("dd", t.description, `${r.name}-content`, [["id", `${r.name}-${t.name}-description`]]);
        }
        addElement("button", selected, `${r.name}-content`, [["id", `${r.name}-select`], ["class", "race-select-button"], ["onclick", `selectRace(this, ${r.name})`], ["active",isActive]])
    }
}

function buildNCAbilities(){
    document.getElementById("noncombat-point-total").innerHTML = p.nonCombatPoints;
    document.getElementById("noncombat-point-remaining").innerHTML = p.nonCombatPoints - p.usedNonCombatPoints;
    document.getElementById("wild-point-total-nc").innerHTML = p.wildAbilityPoints;
    document.getElementById("wild-point-remaining-nc").innerHTML = p.wildAbilityPoints - p.usedWildAbilityPoints;

    for(let i = 0; i < NON_COMBAT_ABILITIES.length; i++){
        addElement("th", `${NON_COMBAT_ABILITIES[i].toUpperCase()}`, "noncombat-headings", []);
        addElement("td", "", "noncombat-base-scores", [["id", `${NON_COMBAT_ABILITIES[i]}-base-score`]]);
        addElement("input", "", `${NON_COMBAT_ABILITIES[i]}-base-score`, [["id", `${NON_COMBAT_ABILITIES[i]}-input`], ["type", "number"], ["onchange", `p.setNonCombatAbility(${i})`], ["value", p.nonCombatAbilities[i]]]);
        addElement("td", modifierStr(p.nonCombatAbilityBonuses[i]), "noncombat-bonuses", []);
        addElement("td", p.nonCombatAbilities[i] + p.nonCombatAbilityBonuses[i], "noncombat-totals", [["id", `${NON_COMBAT_ABILITIES[i]}-total`]]);
        addElement("td", "", "noncombat-modifiers", [["id", `${NON_COMBAT_ABILITIES[i]}-mod`]]);
        setNcModifier(i);
    }
}

function buildICAbilities(){
    document.getElementById("incombat-point-total").innerHTML = p.inCombatPoints;
    document.getElementById("incombat-point-remaining").innerHTML = p.inCombatPoints - p.usedInCombatPoints;
    document.getElementById("wild-point-total-ic").innerHTML = p.wildAbilityPoints;
    document.getElementById("wild-point-remaining-ic").innerHTML = p.wildAbilityPoints - p.usedWildAbilityPoints;

    for(let i = 0; i < IN_COMBAT_ABILITIES.length; i++){
        addElement("th", `${IN_COMBAT_ABILITIES[i].toUpperCase()}`, "incombat-headings", []);
        addElement("td", "", "incombat-base-scores", [["id", `${IN_COMBAT_ABILITIES[i]}-base-score`]]);
        addElement("input", "", `${IN_COMBAT_ABILITIES[i]}-base-score`, [["id", `${IN_COMBAT_ABILITIES[i]}-input`], ["type", "number"], ["onchange", `p.setInCombatAbility(${i})`], ["value", p.inCombatAbilities[i]]]);
        addElement("td", modifierStr(p.inCombatAbilityBonuses[i]), "incombat-bonuses", []);
        addElement("td", p.inCombatAbilities[i] + p.inCombatAbilityBonuses[i], "incombat-totals", [["id", `${IN_COMBAT_ABILITIES[i]}-total`]]);
        addElement("td", "", "incombat-modifiers", [["id", `${IN_COMBAT_ABILITIES[i]}-mod`]]);
        setIcModifier(i);
    }
}

function buildArchetypes(){
    let e = addElement("input", "", "archetypes", [["id", "level-input"], ["type", "number"], ["min", "1"], ["max", "60"], ["onchange", "p.setLevel(this)"]]);
    e.value = p.level;
    let boonlv = 1;
    let currentArchs = []; // adds archs as they are added

    // doing all the stuff for lv 1 and then multiples of 4
    while(boonlv <= p.level){
       currentArchs = buildBoon(boonlv, currentArchs);

        // indexing
        boonlv = Math.floor(boonlv/4)*4 + 4;
    }
}

/**
 * @todo I think this works but its still a little jank
 * @param {Number} boonlv 
 * @param {Archetype[]} currentArchs 
 */
function buildBoon(boonlv, currentArchs){
    addElement("button", `Level ${boonlv} Boon`, "archetypes", [["id", `level-${boonlv}-boon-accordion`], ["class", "accordion"], ["onclick", `openAccordion("level-${boonlv}-boon-content")`]]);
    addElement("div", "", "archetypes", [["id", `level-${boonlv}-boon-content`], ["class", "accordion-content"]]);
    openAccordion(`level-${boonlv}-boon-content`);
    addElement("button", "Select Archetype", `level-${boonlv}-boon-content`, [["id", `level-${boonlv}-archetype-selection-accordion`], ["class", "accordion"], ["onclick", `openAccordion("level-${boonlv}-archetype-selection-content")`]]);
    addElement("div", "", `level-${boonlv}-boon-content`, [["id", `level-${boonlv}-archetype-selection-content`], ["class", "accordion-content"]]);
    addElement("dl", "", `level-${boonlv}-boon-content`, [["id", `level-${boonlv}-boon-description`]]);
    
    for(let a of Archetype.allArchetypes){
        console.log(a.name);
        addElement("button", a.name, `level-${boonlv}-archetype-selection-content`, [["id", `level-${boonlv}-${a.name}-accordion`], ["class", "accordion"], ["onclick", `openAccordion("level-${boonlv}-${a.name}-content")`]]);
        addElement("div", "", `level-${boonlv}-archetype-selection-content`, [["id", `level-${boonlv}-${a.name}-content`], ["class", "accordion-content"]]);

        addElement("h4", "Subarchetype", `level-${boonlv}-${a.name}-content`, []);
        let selected = "SELECT";
        /** @type {String} */
        let subArch;
        /** @type {SubArchetype} */
        let s;

        // making the subarch selection depending on if a subarch has already been selected
        if(currentArchs.includes(a)){
            if(p.archetypes.get(boonlv) != null){
                subArch = p.archetypes.get(boonlv).name;
                s = nameToObject(subArch, a.subArchetypes);
                selected = "SELECTED";
            }
            else{
                for(let sa of p.archetypes.values()){
                    if(sa.parentArchetype == a){
                        s = sa;
                        break;
                    }
                }
            }
            boonSummary(s, boonlv, `level-${boonlv}-${a.name}-content`);
            
            boonSummary(s, boonlv, `level-${boonlv}-boon-description`);
        }
        else{
            // setting up selection thingo
            let e = addElement("select", "", `level-${boonlv}-${a.name}-content`, [["id", `level-${boonlv}-${a.name}-subarchetype-selector`]]);
            let d = addElement("dl", "", `level-${boonlv}-${a.name}-content`, [["id", `level-${boonlv}-${a.name}-subarchetype-description`]]);
            e.setAttribute("onchange", `selectSubArchetype(${boonlv}, ${a.name}, this.value, this)`)
            for(let sa of a.subArchetypes){
                addElement("option", sa.name, `level-${boonlv}-${a.name}-subarchetype-selector`, [["value", sa.name]]);
            }
            let sa = p.archetypes.get(boonlv);
            
            // if there is a subarchetype selected
            if(sa != null){
                subArch = sa.name;
                e.value = subArch;
                d.innerHTML = "";
                selected = "SELECTED"
                s = nameToObject(subArch, a.subArchetypes);
                if(s != -1){
                    console.log(s, boonlv);
                    boonSummary(s, boonlv, d.id);
                    console.log("is it the second one?");
                    boonSummary(s, boonlv, `level-${boonlv}-boon-description`);
                    currentArchs.push(a);
                }
            }
        }
        let isActive = selected == "SELECT" ? "f" : "t";
        let selectButton = addElement("button", selected, `level-${boonlv}-${a.name}-content`, [["id", `level-${boonlv}-${a.name}-select`], ["class", "archetype-select-button"], ["active", isActive], ["onclick", `selectArchetype(${boonlv}, ${a.name}, this)`]]);
    }
    return currentArchs;
}

/**
 * 
 * @param {Number} boonlv 
 * @param {Archetype} arch 
 * @param {Element} button 
 * @returns
 */
function selectArchetype(boonlv, arch, button){    
    // if archetype was already selected
    if(button.innerHTML == "SELECTED"){
        return;
    }
    // if the archetype wasnt selected
    else{
        button.innerHTML = "SELECTED";
        button.setAttribute("active", "t");
        // unselects the other options
        for(a of Archetype.allArchetypes){
            if(a != arch){
                document.getElementById(`level-${boonlv}-${a.name}-select`).innerHTML = "SELECT";
                document.getElementById(`level-${boonlv}-${a.name}-select`).setAttribute("active", "f");
            }
        }
    }

    // sets the archetype for p
    let subArch;
    if(p.getArchList().includes(arch)){
        subArch = p.archetypes.get(boonlv);
    }
    else{
        let selection = document.getElementById(`level-${boonlv}-${arch.name}-subarchetype-selector`);
        subArch = nameToObject(selection.value, arch.subArchetypes);
    }
    p.setArchetype(boonlv, subArch);
    
    // closes accordions
    openAccordion(`level-${boonlv}-${arch.name}-content`);
    openAccordion(`level-${boonlv}-archetype-selection-content`);

    boonSummary(subArch, boonlv, `level-${boonlv}-boon-description`);

    // resets all the other levels accordingly
    updateBoonSelectors();
}

/**
 * Changes the subarchetype when the value of the subarchetype selector is changed
 * @param {Number} boonlv 
 * @param {Archetype} parentArch
 * @param {String} subArchName
 * @param {Element} elem 
 */
function selectSubArchetype(boonlv, parentArch, subArchName, elem){
    // gets the subarch from the name
    let s = nameToObject(subArchName, parentArch.subArchetypes);
    
    // changes boon summaries
    boonSummary(s, boonlv, `level-${boonlv}-${parentArch.name}-subarchetype-description`)

    // changes the Character p
    for(let [lv, subArch] of p.archetypes.entries()){
        if(subArch.parentArchetype == parentArch){
            boonSummary(s, lv, `level-${lv}-boon-description`)
            p.setArchetype(lv, s);
        }
    }
    if(elem.value != ""){
        document.getElementById(`level-${boonlv}-${parentArch.name}-select`).disabled = false;
    }
}

function updateBoonSelectors(){
    let boonlv = 1;
    while(boonlv <= p.level){
        
        boonlv = (boonlv + 4) - boonlv % 4;
    }
}

/**
 * 
 * @param {SubArchetype} arch the subarchetype that we are displaying for
 * @param {Number} boonlv
 * @param {String} parentElem
 */
function boonSummary(arch, boonlv, parentElem){
    // writes the boon descriptions under the accordion
    removeChildren(document.getElementById(parentElem));

    /** @todo the line below is little useless depending on parentElem. minor efficiency issue */
    addElement("p", `Selected: ${arch.name}`, parentElem, []);

    for(b of arch.boons.get(boonlv)){
        addElement("dt", b.name, parentElem, []);
        addElement("dd", b.description, parentElem, []);
    }
}

function loadBuildCharacter(){
    if(loadedFile == null){
        console.log("no loaded file");
        return;
    }
    let fr = new FileReader();
    fr.onload = function(){
        console.log("when is this called");
        p = new Character(JSON.parse(fr.result));
        resetBuilder();
    }
    fr.readAsText(loadedFile);
}