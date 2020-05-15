let letters = [];
let deletedLetters = [];
let typedCharacters = [];
let deletedCharacters = [];
let images = [];
let deletedImages = [];

let myCursor;
let bottomWall, topWall, rightWall, leftWall;
let world, engine;
let mouseConstraint;
let canvas, canvasSize, fps;

let wordCount = document.getElementById("wordCount");
let charCount = document.getElementById("charCount")
let fpsStat = document.getElementById("fpsStat")

let font, fontSize, fontStyle, underline, bodySize, textColor;
let textOffsetX, textOffsetY;
let gravityStrength, exitForce, randomForce;
let cursorBoundX, cursorBoundY;
let moveCursor, spaceChars;
let sideWalls, interruptPaste, rainbow, shouldRotate;

var listener = new window.keypress.Listener();

let the, theImgBody;
let goodJob, goodJobImgBody;
function preload() {
    // preload() runs once
    console.log("new update 1");
    the = loadImage("img/assets/the.png");
    goodJob = loadImage("img/assets/goodjob.png");
}

function setup() {
    fps = 60;
    frameRate(fps);
    canvasSize = screen.height * 0.55;

    canvas = createCanvas(canvasSize, canvasSize * 11 / 8.5);
    canvas.parent('docContainer');
    canvas.id('doc');
    engine = Matter.Engine.create();
    world = engine.world;

    setGravity();
    setExitForce();
    setRandom();
    setFontStyle();
    setFont();
    setFontSize();
    setSpaceChars();
    setTextColor();
    setMoveCursor();
    setDocumentTitle("Gravity Doc");
    addKeyListeners();
    showFPS();
    rainbow = false;
    shouldRotate = false;
    sideWalls = true;
    interruptPaste = false;

    var marginSize = width * 0.125;
    theImgBody = new ImageBody(100, 100, the);
    theImgBody.remove();
    goodJobImgBody = new ImageBody(100, 200, goodJob);
    goodJobImgBody.remove();

    bottomWall = new Boundary(width / 2, height - (marginSize / 2), width, marginSize);
    topWall = new Boundary(width / 2, (marginSize / 2), width, marginSize);
    rightWall = new Boundary(width - (marginSize / 2), height / 2, marginSize, height);
    leftWall = new Boundary((marginSize / 2), height / 2, marginSize, height);

    cursorBoundX = marginSize + 10;
    cursorBoundY = marginSize + 10;

    myCursor = new Cursor(cursorBoundX, cursorBoundY, cursorBoundX, cursorBoundY);
    //cursor.setup();
    var canvasmouse = Matter.Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    };
    canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
    canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);
    mouseConstraint = Matter.MouseConstraint.create(engine, options);
    Matter.World.add(world, mouseConstraint);
}
function mouseClicked(event) {
    if ((mouseX > cursorBoundX && mouseX < width - cursorBoundX) && (mouseY > cursorBoundY && mouseY < height - cursorBoundY)) {
        //move cursor to location if inside page
        myCursor.x = mouseX;
        myCursor.y = mouseY;
    }
}

function undo() {
    interruptPaste = true;
    var c = typedCharacters.pop();

    deletedCharacters.push(c);
    if (c == "\n") {
        myCursor.stepUp(bodySize, moveCursor);
    }
    else if (c == "\t") {
        myCursor.stepBack(bodySize, moveCursor);
        myCursor.stepBack(bodySize, moveCursor);
        myCursor.stepBack(bodySize, moveCursor);
        myCursor.stepBack(bodySize, moveCursor);
    }
    else {
        myCursor.stepBack(bodySize, moveCursor);
    }
    if (letters.length > 0 && (c != "\t" && c != "\n") || (c == " " && spaceChars)) {
        letters[letters.length - 1].remove();
        deletedLetters.push(letters.pop());
    }
}

function redo() {
    var c = deletedCharacters.pop();
    if (c != null) {
        typedCharacters.push(c);
        if (c == "\n") {
            myCursor.stepDown(bodySize);
        }

        else if (c == "\t") {
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
        }
        else {
            myCursor.step(bodySize, moveCursor);
        }
        if (letters.length > 0 && (c != "\t" && c != "\n") || (c == " " && spaceChars)) {
            deletedLetters[deletedLetters.length - 1].add();
            letters.push(deletedLetters.pop());
        }
    }
}

function reset() {
    console.log("resetting");
    location.reload();
}

function saveDoc() {
    //console.log(document.getElementById("docTitle").textContent);
    saveCanvas(document.getElementById("docTitle").textContent);
}

function setGravity() {
    gravityStrength = document.getElementById("gravityStrength").value / 18;
    var e = document.getElementsByName('gravity');
    var i;
    for (i = 0; i < e.length; i++) {
        if (e[i].checked) {
            break;
        }
    }
    e[i].blur();
    switch (i) {
        //left
        case 0:
            world.gravity.x = -gravityStrength;
            world.gravity.y = 0;
            break;
        //right
        case 3:
            world.gravity.x = gravityStrength;
            world.gravity.y = 0;
            break;
        //up
        case 1:
            world.gravity.x = 0;
            world.gravity.y = -gravityStrength;
            break;
        //down
        case 2:
            world.gravity.x = 0;
            world.gravity.y = gravityStrength;
            break;
    }
    canvas.elt.focus();
}

function setFont() {
    font = document.getElementById("fontSelect").value.toLowerCase();
    console.log("Font is: " + document.getElementById("fontSelect").value.toLowerCase());
}

function setFontSize() {

    var s = parseInt(document.getElementById("fontSizeSelect").value.slice(0, -3));
    switch (s) {
        case 12:
            fontSize = 20;
            bodySize = 15;
            textOffsetX = -5;
            textOffsetY = 8;
            break;
        case 24:
            fontSize = 40;
            bodySize = 25;
            textOffsetX = -10;
            textOffsetY = 10;
            break;
        case 72:
            fontSize = 80;
            bodySize = 50;
            textOffsetX = -20;
            textOffsetY = 20;
            break;
    }
}


function setFontStyle() {
    console.log("setting font style");
    var e = document.getElementsByName('fontStyle');
    var style = "";
    //bold
    if (e[0].checked) {
        style += "b";
    }
    //italics
    if (e[1].checked) {
        style += "i";
    }

    switch (style) {
        case "b":
            fontStyle = BOLD;
            break;
        case "i":
            fontStyle = ITALIC;
            break;
        case "":
            fontStyle = NORMAL;
            break;
        case "bi": //lol
            fontStyle = BOLDITALIC;
            break;
    }
    underline = e[2].checked;
}

function setTextColor() {
    textColor = document.getElementById("textColorPicker").value;
}

function generateNewColor() {
    document.getElementById("textColorPicker").value = "#" + Math.random().toString(16).slice(2, 8);
    setTextColor();
}

function setMoveCursor() {
    moveCursor = document.getElementById("moveCursor").checked;
}

function setExitForce() {
    exitForce = document.getElementById("exitForce").value / 5;
}
function setRandom() {
    randomForce = document.getElementById("random").value / 16;
}

function newDoc() {
    window.open(window.location.href, '_blank');
}

function test() {
    console.log("testing");
}

function setSpaceChars() {
    spaceChars = document.getElementById("spaceChars").checked;
}
function updateGlobalRainbowColors() {

}
function handleKeyDown(e) {
    if (rainbow) generateNewColor();
    if ((e.keyCode >= 186 && e.keyCode <= 192) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 219 && e.keyCode <= 222)) {
        spawnChar(e.key);
    }
    //space
    else if (e.keyCode == 32) {
        myCursor.step(bodySize, moveCursor);
        e.preventDefault();
        typedCharacters.push(e.key);
        if (spaceChars) {
            var r = Math.random() * randomForce - randomForce / 2;
            letters.push(new Letter(myCursor.x, myCursor.y, bodySize, " ", font, fontSize, textOffsetX, textOffsetY, exitForce, r, fontStyle, underline, textColor));
        }
    }
    //backspace
    else if (e.keyCode == 8) {
        undo();
    }
    //enter
    else if (e.keyCode == 13) {
        myCursor.stepDown(bodySize, moveCursor);
        typedCharacters.push("\n");
    }
    //tab
    else if (e.keyCode == 9) {
        myCursor.step(bodySize, moveCursor);
        myCursor.step(bodySize, moveCursor);
        myCursor.step(bodySize, moveCursor);
        myCursor.step(bodySize, moveCursor);
        e.preventDefault();
        typedCharacters.push("\t");
    }
    //up arrow
    else if (e.keyCode == 38) {
        myCursor.stepUp(bodySize, moveCursor);
        e.preventDefault();
    }
    //down arrow
    else if (e.keyCode == 40) {
        myCursor.stepDown(bodySize, moveCursor);
        e.preventDefault();
    }
    //right arrow
    else if (e.keyCode == 39) {
        myCursor.step(bodySize, moveCursor);
        e.preventDefault();
    }
    //left arrow
    else if (e.keyCode == 37) {
        myCursor.stepBack(bodySize, moveCursor);
        e.preventDefault();
    }
    //console.log("pressed " + e.key + " " + e.keyCode);
    //console.log(typedCharacters.join(""));
}
function setDocumentTitle(newName) {
    document.getElementById("docTitle").textContent = newName;
    document.title = newName;
}

 async function copyText() {
    navigator.clipboard.writeText(typedCharacters.join(""))
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}
async function pasteText(){
    const text = await navigator.clipboard.readText();
    interruptPaste = false;
    //console.log(interruptPaste);
    spawnString(text, text.length - 1);
    console.log(text);
}
function addKeyListeners() {
    console.log("adding keypress listener");
    window.addEventListener("keydown", handleKeyDown, false);

    listener.simple_combo("ctrl z", function () {
        undo();
    });
    listener.simple_combo("cmd z", function () {
        undo();
    });

    listener.simple_combo("ctrl shift z", function () {
        console.log("yeee");
        redo();
    });

    listener.simple_combo("ctrl s", function () {
        saveDoc(document.getElementById("docTitle").textContent);
    });
    listener.simple_combo("cmd s", function () {
        saveDoc(document.getElementById("docTitle").textContent);
    });

    listener.simple_combo("ctrl n", function () {
        newDoc();
    });

    listener.simple_combo("ctrl c", function () {
        copyText();
    });
    listener.simple_combo("cmd c", function () {
        copyText();
    });

    listener.simple_combo("ctrl v",  function () {
        pasteText();
    });
    listener.simple_combo("cmd v", function () {
        pasteText();
    });

    listener.sequence_combo("up up down down left right left right b a enter", function () {
        console.log("The inner machinations of my mind are an enigma. – Patrick Star");
        if (theImgBody.inWorld) removeImgBody(theImgBody);
        else addImgBody(theImgBody);
    }, true);
    listener.sequence_combo("a b c right left left up down up a b c enter", function () {
        console.log("Keep it up!");
        if (goodJobImgBody.inWorld) removeImgBody(goodJobImgBody);
        else addImgBody(goodJobImgBody);
    }, true);
    listener.sequence_combo("down r o y g b i v down enter", function () {
        console.log("😎😎😎");
        rainbow = !rainbow;
    }, true);
    listener.sequence_combo("left left right right left right enter", function () {
        console.log("toggle side walls");
        if (sideWalls) {
            Matter.Composite.remove(world, rightWall.body);
            Matter.Composite.remove(world, leftWall.body);
        }
        else {
            Matter.Composite.add(world, rightWall.body);
            Matter.Composite.add(world, leftWall.body);
        }
        sideWalls = !sideWalls;
    }, true);
    listener.sequence_combo("up up s t a r down down enter", function () {
        console.log("star war mode activated");
        interruptPaste = false;
        var star = "Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…";
        spawnString(star, star.length - 1);
    }, true);
    listener.sequence_combo("right down left up right down left up enter", function () {
        console.log("What about the reality where Hitler cured cancer, Morty? The answer is: don't think about it.");
        shouldRotate = !shouldRotate;
    }, true);
}
function removeKeyListeners() {
    console.log("removing keypress listener");
    window.removeEventListener("keydown", handleKeyDown, false);
}
function spawnChar(c) {
    myCursor.step(bodySize, moveCursor);
    var r = Math.random() * randomForce - randomForce / 2;
    letters.push(new Letter(myCursor.x, myCursor.y, bodySize, c, font, fontSize, textOffsetX, textOffsetY, exitForce, r, fontStyle, underline, textColor));
    typedCharacters.push(c);
    updateWordStats();
}

function removeImgBody(imgBody) {
    imgBody.remove();
    for (var i = 0; i < images.length; i++) {
        if (images[i] == imgBody) {
            images.splice(i, 1)
        }
    }
}
function addImgBody(imgBody) {
    imgBody.add();
    images.push(imgBody);
}
function spawnString(s, i) {
    setTimeout(function () {
        //console.log("spawning char "+ s[s.length-1-i]+" "+ i); //  your code here  
        spawnChar(s[s.length-1-i]);
        if (i-- && !interruptPaste) spawnString(s, i);
    }, 10)
}
var a = 0.0;
var twoPI = Math.PI*2;
var rotateStep = Math.PI*0.01;
function rotateGravity(){
    if(a>twoPI) a=0;
    world.gravity.x = Math.cos(a)*gravityStrength;
    world.gravity.y = Math.sin(a)*gravityStrength;
    a+=rotateStep;
}

function showFPS() {
    setTimeout(function () {
        fpsStat.textContent = getFrameRate().toFixed(1);
        showFPS();
    }, 1000)
}

function updateWordStats(){
    charCount.textContent = letters.length;
    //wordCount.textContent = (letters.match(/ /g) || []).length; 
}

function draw() {
    if(shouldRotate) rotateGravity();
    background(255);
    Matter.Engine.update(engine);
    letters.forEach(element => element.show());
    images.forEach(element => element.show());
    /*
    leftWall.show_debug();
    rightWall.show_debug();
    topWall.show_debug();
    bottomWall.show_debug();
    */
    myCursor.show(bodySize);
}