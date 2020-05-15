let name = "";
let inputElement = document.getElementById("nameInput");

function handleNameSubmit() {
    var newName = document.getElementById("nameInput").value;
    if (newName > 30 || newName.length == 0) {
        setDocumentTitle("Untitled Document");
    }
    else {
        setDocumentTitle(newName);
    }
}
