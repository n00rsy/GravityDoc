let letters = [];
let deletedLetters = [];
let typedCharacters = [];
let deletedCharacters = [];

let myCursor;
let bottomWall, topWall, rightWall, leftWall;
let world, engine;
let mouseConstraint;

let canvas;

let fps;
let font, fontSize, fontStyle, underline, bodySize;
let textOffsetX, textOffsetY;
let gravityStrength, exitForce, randomForce;
let cursorBoundX, cursorBoundY;

var listener = new window.keypress.Listener();



function setup() {

    fps = 60;
    font = "monospace";
    fontSize = 20;
    bodySize = 15;
    textOffsetX = -5;
    textOffsetY = 8;

    frameRate(fps);
    var canvasSize = 640;
    canvas = createCanvas(canvasSize, canvasSize * 11 / 8.5);
    canvas.parent('docContainer');
    canvas.id('doc');
    engine = Matter.Engine.create();
    world = engine.world;

    setGravityStrength();
    shiftGravity();
    setExitForce();
    setRandom();
    setFontStyle();

    addKeyListeners();

    var marginSize = width * 0.125;

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
    else {
        //dont show cursor

    }
}

function undo(moveCursor) {
    var c = typedCharacters.pop();
    if (c != null) {
        deletedCharacters.push(c);
        if (moveCursor) {
            if (c == "\n") {
                myCursor.stepUp(bodySize);
            }
            else if (c == "\t") {
                myCursor.stepBack(bodySize);
                myCursor.stepBack(bodySize);
                myCursor.stepBack(bodySize);
                myCursor.stepBack(bodySize);
            }

            else {
                myCursor.stepBack(bodySize);
            }
        }
        if (c != "\t" && c != "\n" && c != " " && letters.length > 0) {
            letters[letters.length - 1].remove();
            deletedLetters.push(letters.pop());
        }
    }
}

function redo(moveCursor) {
    var c = deletedCharacters.pop();
    if (c != null) {
        typedCharacters.push(c);
        if (moveCursor) {
            if (c == "\n") {
                myCursor.stepDown(bodySize);
            }

            else if (c == "\t") {
                myCursor.step(bodySize);
                myCursor.step(bodySize);
                myCursor.step(bodySize);
                myCursor.step(bodySize);
            }
            else {
                myCursor.step(bodySize);
            }
        }
        if (c != "\t" && c != "\n" && c != " " && deletedLetters.length > 0) {
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
    save(document.getElementById("docTitle").textContent);
}

function shiftGravity() {

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
        case 2:
            world.gravity.x = gravityStrength;
            world.gravity.y = 0;
            break;
        //up/down
        case 1:
            if (world.gravity.y == 0) {
                world.gravity.y = world.gravity.x;
                world.gravity.x = 0;
            }
            else {
                world.gravity.y = -world.gravity.y;
            }
            break;
    }
    canvas.elt.focus();
}

function changeFont() {
    font = document.getElementById("fontSelect").value.toLowerCase();
}

function changeFontSize() {

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

function setGravityStrength() {
    gravityStrength = document.getElementById("gravityStrength").value / 20;
    console.log(gravityStrength);

    if (world.gravity.x > 0) {
        world.gravity.x = gravityStrength;
    }
    else if (world.gravity.x < 0) {
        world.gravity.x = -gravityStrength;
    }
    else if (world.gravity.y > 0) {
        world.gravity.y = gravityStrength;
    }
    else if (world.gravity.y <= 0) {
        world.gravity.y = -gravityStrength;
    }
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


function handleKeyDown(e) {
    if ((e.keyCode >= 186 && e.keyCode <= 192) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 219 && e.keyCode <= 222)) {
        var c = e.key;
        myCursor.step(bodySize);
        var r = Math.random() * randomForce - randomForce / 2;
        letters.push(new Letter(myCursor.x, myCursor.y, bodySize, c, font, fontSize, textOffsetX, textOffsetY, exitForce, r, fontStyle, underline));
        typedCharacters.push(e.key);
    }
    //space
    else if (e.keyCode == 32) {
        myCursor.step(bodySize);
        e.preventDefault();
        typedCharacters.push(e.key);
    }
    //backspace
    else if (e.keyCode == 8) {
        undo(true);

    }
    //enter
    else if (e.keyCode == 13) {
        myCursor.stepDown(bodySize);
        typedCharacters.push("\n");
    }
    //tab
    else if (e.keyCode == 9) {
        myCursor.step(bodySize);
        myCursor.step(bodySize);
        myCursor.step(bodySize);
        myCursor.step(bodySize);
        e.preventDefault();
        typedCharacters.push("\t");
    }
    //up arrow
    else if (e.keyCode == 38) {
        myCursor.stepUp(bodySize);
        e.preventDefault();
    }
    //down arrow
    else if (e.keyCode == 40) {
        myCursor.stepDown(bodySize);
        e.preventDefault();
    }
    //right arrow
    else if (e.keyCode == 39) {
        myCursor.step(bodySize);
        e.preventDefault();
    }
    //left arrow
    else if (e.keyCode == 37) {
        myCursor.stepBack(bodySize);
        e.preventDefault();
    }
    //console.log("pressed " + e.key + " " + e.keyCode);
    console.log(typedCharacters.join(""));
}

function addKeyListeners() {
    console.log("adding keypress listener");
    window.addEventListener("keydown", handleKeyDown, false);

    listener.simple_combo("ctrl z", function () {
        undo(true);
    });
    listener.simple_combo("ctrl shift z", function () {
        console.log("yeee");
        redo(true);
    });

    listener.simple_combo("ctrl s", function () {
        myCursor.dontShow();
        saveDoc(document.getElementById("docTitle").textContent);
    });

    listener.simple_combo("ctrl n", function () {
        newDoc();
    });

    listener.sequence_combo("up up down down left right left right b a enter", function() {
        console.log("achieved beastmode");
    }, true);

}



function removeKeyListeners() {
    console.log("removing keypress listener");
    window.removeEventListener("keydown", handleKeyDown, false);
}
function draw() {
    background(255);
    Matter.Engine.update(engine);
    letters.forEach(element => element.show());

    /*
    leftWall.show_debug();
    rightWall.show_debug();
    topWall.show_debug();
    bottomWall.show_debug();
*/
    myCursor.show(bodySize);
}