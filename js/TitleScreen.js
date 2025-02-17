/**
 * This is the js code behind the title screen i.e. KamrynArchives.html
 */

// setting variables

function titleScreenInit(){

}

function editLoadedCharacter(){
    // mode 1 is for editing characters
    sessionStorage.setItem("mode", "1");
    console.log(sessionStorage.getItem("mode"));
    loadCharacter();
    console.log(localStorage.getItem("character"));

    document.location = "html/CharacterBuilder.html";
}

function viewLoadedCharacter(){
    sessionStorage.setItem("p");
}

function createNewCharacter(){
    // mode 0 is for creating new characters
    localStorage.setItem("mode", "0");
    console.log(sessionStorage.getItem("mode"));
    document.location = "html/CharacterBuilder.html";
}
