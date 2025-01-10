/**
 * This is the js code behind the title screen i.e. KamrynArchives.html
 */

// setting variables

function titleScreenInit(){

}

function resetTitle(){
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

    <div id="file-input">
        Select file to load
        <input type="file" onchange="setLoadFile(this)">
    </div>
    <div>
        <button id="edit-character" onclick="editLoadedCharacter()">Edit Loaded Character</button>
        <button id="view-character" onclick="viewLoadedCharacter()">View Loaded Character</button>
    </div>
    <div>
        <button id="create-new-character" onclick="createNewCharacter()">Create New Character</button>
    </div>`
    document.getElementById("style").setAttribute("href", "css/titleScreen.css");
    titleScreenInit();
    document.title = "Kamryn Archives"
}

function editLoadedCharacter(){

}

function viewLoadedCharacter(){
    sessionStorage.setItem("p");
}

function createNewCharacter(){
    p = new Character();
    resetBuilder();
}
