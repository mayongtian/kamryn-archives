/**
 * This document contains the basic custom functions that are able to be used in all the related documents.
 */
// some const variables
const BASE_OUT_COMBAT_ABILITY_POINTS = 40;
const BASE_AC = 9;

const NON_COMBAT_ABILITIES = ["str", "dex", "con", "int", "wis", "cha"];

const IN_COMBAT_ABILITIES = ["pow", "spe", "fin", "wit", "pre", "spl"];

var filename = "jeff.JSON";
var loadedFile;

/**
 * @type {Character}
 */
var p;

// Snapshot of a character for bugtesting - this is the lv4 human paladin Jeff
function createJeff(){
    const jeff = new Character();
    jeff.name = "Jeff";
    jeff.level = 4;
    jeff.setRace(Human);
    jeff.setArchetype(1, Paladin);
    jeff.setArchetype(4, Paladin);
    jeff.loadBoons();
    jeff.organiseBoons();
    p = jeff;
    localStorage.setItem("test", "nooooo");
    console.log(localStorage.test);
}

// basic functions

/**
 * 
 * @param {str} name 
 * @param {Array} list 
 * @returns 
 */
function nameToObject(name, list){
    for(let i of list){
        if(i.name == name){
            return i;
        }
    }
    return -1;
}

/**
 * turns a map into an array
 * @param {Map} m 
 * @param {Function} f1 a funciton to apply to all keys
 * @param {Function} f2 a function to apply to all values
 * 
 * @returns {Array}
 */
function mapToArray(m, f1, f2){
    let arr = [];
    for([i, j] of m.entries()){
        if(f1 != undefined) i = f1(i);
        if(f2 != undefined) j = f2(j)
        arr.push([i, j]);
    }
    return arr;
}

/**
 * 
 * @param {Element} elem 
 */
function removeChildren(elem){
    while(elem.hasChildNodes()){
        elem.removeChild(elem.firstChild);
    }
}

/**
 * @param {Number} modifier 
 * @returns {String}
 */
function modifierStr(modifier){
    if(modifier < 0){
        return `-${modifier}`;
    }
    else{
        return `+${modifier}`;
    }
}

function setNcModifier(abilityIdx){
    document.getElementById(`${NON_COMBAT_ABILITIES[abilityIdx]}-mod`).innerHTML = modifierStr(p.nonCombatModifier(abilityIdx));
}

function setIcModifier(abilityIdx){
    document.getElementById(`${IN_COMBAT_ABILITIES[abilityIdx]}-mod`).innerHTML = modifierStr(p.inCombatModifier(abilityIdx));
}


// HTML things
/**
 * adds an element to the thing
 * @param {str} elementType
 * @param {str} innerHTML
 * @param {str} wrapperID
 * @param {[[str, str]]} attributes
 */
function addElement(elementType, innerHTML, wrapperID, attributes){
    let elem = document.createElement(elementType);
    if(attributes != undefined){
        for(let [attr, val] of attributes){
            elem.setAttribute(attr, val);
        }
    }
    elem.innerHTML = innerHTML;
    if(wrapperID == null){
        document.body.appendChild(elem);
    }
    else{
        document.getElementById(wrapperID).appendChild(elem);
    }
    return elem;
}

function removeElement(elementId){
    let elem = document.getElementById(elementId);
    if(elem == null){
        return false;
    }
    while(elem.hasChildNodes()){
        elem.removeChild(elem.firstChild);
    }
    elem.remove();
    return true;
}

/**
 * Opens a tab division
 */
function openTab(evt, tabName){
    var tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(let i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    tablinks=document.getElementsByClassName("tablink");
    for(let i = 0 ; i < tablinks.length ; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * 
 * @param {String} accName id of content of accordion
 */
function openAccordion(accName){
    // if it is active make it inactive
    if(document.getElementById(accName).style.display == "block"){
        document.getElementById(accName).style.display = "none";
    }
    else{
        document.getElementById(accName).style.display = "block";
    }
}

// saving stuff

function setSaveFile(elem){
    filename = elem.value;
}

function saveCharacter(){
    let character = JSON.stringify(p, stringifyObjects);
    download(filename, character);
}

/**
 * I genuinely have no idea how to make this less complex lol
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
function stringifyObjects(key, value){
    let getName = (i) => i.name;
    if(key == "race") return value.name;
    else if(key == "archetypes") return mapToArray(value, undefined, getName);
    else if(key == "boonList"){
        let v = [];
        for(i of value){
            v.push(i.name);
        }
        return v;
    }
    else if(key == "actions") {
        let v = []
        for(let [cost, actionList] of value.entries()){
            let l = [];
            for(a of actionList){
                l.push(a.name);
            }
            v.push([cost, l])
        }
        return v;
    }
    else if(key == "reactions") return mapToArray(value, undefined, getName);
    else if(key == "passiveList"){
        let v = [];
        for(i of value){
            v.push(i.name);
        }
        return v;
    }
    else return value;
}

/**
 * 
 * @param {Element} elem 
 */
function setLoadFile(elem){
    loadedFile = elem.files[0];
}

function loadCharacter(){
    if(loadedFile == null){
        console.log("no loaded file");
        return;
    }
    let fr = new FileReader();
    fr.onload = function(){
        console.log(fr.result);
        localStorage.setItem("character", fr.result);
        p = new Character(JSON.parse(fr.result));
    }
    fr.readAsText(loadedFile);
    
}

// below are functions to help the player load the more complicated attributes
/**
 * 
 * @param {[Number, String[]]} obj the nonfunctional object saved in the JSON
 * @returns the correct actions map
 */
function loadCharacterActions(obj){
    let r = new Map();
    for(let [k, aList] of obj){
        let l = []
        for(let a of aList){
            l.push(nameToObject(a, Boon.allBoons));
        }
        r.set(k, l);
    }
    return r;
}

/**
 * 
 * @param {[Number, String]} obj obj.archetypes as in the JSON object
 */
function loadCharacterArchetypes(obj){
    let r = new Map();
    for(let [lv, n] of obj){
        for(let a of Archetype.allArchetypes){
            for(let s of a.subArchetypes){
                if(s.name == n){
                    r.set(lv, s);
                    break;
                }
            }
        }
    }
    return r;
}

function loadCharacterBoonList(obj){
    let r = [];
    for(let b of obj){
        r.push(nameToObject(b, Boon.allBoons));
    }
    return r;
}

function loadCharacterRace(obj){
    return nameToObject(obj, Race.allRaces);
}

/**
 * https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
 * @param {str} filename 
 * @param {str} text 
 */
function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// for the little menu that navigates between the screens
function naviMenu(){
    addElement("div", "", null, [["id", "menu-block"], ["class", "menu-block"]]);
    addElement("button", "Menu", "menu-block", [["id", "menu-button"], ["class", "menu-button"], ["onclick", "openAccordion('menu-content')"]]);
    
    addElement("div", "", "menu-block", [["id", "menu-content"], ["class", "menu-content"]]);
    addElement("button", "Builder", "menu-content", [["id", "builder-button"], ["class", "page-change-button"], ["onclick", "resetBuilder()"]]);
    addElement("button", "Viewer", "menu-content", [["id", "viewer-button"], ["class", "page-change-button"], ["onclick", "resetViewer()"]]);
}