var letters = [];
var deleted = [];
var cursor = void 0;
var bottomWall = void 0,
    topWall = void 0,
    rightWall = void 0,
    leftWall = void 0;
var world = void 0,
    engine = void 0;
var mouseConstraint = void 0;

var canvas = void 0;

var fps = void 0;
var font = void 0,
    fontSize = void 0,
    bodySize = void 0;
var textOffsetX = void 0,
    textOffsetY = void 0;
var gravityStrength = void 0;
var cursorBoundX = void 0;
var cursorBoundY = void 0;

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

    var marginSize = width * 0.125;

    bottomWall = new Boundary(width / 2, height - marginSize / 2, width, marginSize);
    topWall = new Boundary(width / 2, marginSize / 2, width, marginSize);
    rightWall = new Boundary(width - marginSize / 2, height / 2, marginSize, height);
    leftWall = new Boundary(marginSize / 2, height / 2, marginSize, height);

    cursorBoundX = marginSize + 10;
    cursorBoundY = marginSize + 10;

    cursor = new Cursor(cursorBoundX, cursorBoundY, cursorBoundX, cursorBoundY);
    //cursor.setup();
    var canvasmouse = Matter.Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    };
    mouseConstraint = Matter.MouseConstraint.create(engine, options);
    Matter.World.add(world, mouseConstraint);
}
function mouseClicked(event) {
    if (mouseX > cursorBoundX && mouseX < width - cursorBoundX && mouseY > cursorBoundY && mouseY < height - cursorBoundY) {
        cursor.x = mouseX;
        cursor.y = mouseY;
    }
}

function undo() {
    if (letters.length > 0) {
        letters[letters.length - 1].remove();
        deleted.push(letters.pop());
    }
    cursor.stepBack(bodySize);
}

function redo() {
    if (deleted.length > 0) {
        deleted[deleted.length - 1].add();
        letters.push(deleted.pop());
    }
}

function reset() {
    console.log("resetting");
    location.reload();
}

function saveDoc() {
    save(document.getElementById("docTitle").textContent);
}

function shiftGravity(x) {
    switch (x) {
        //left
        case 0:
            world.gravity.x = -gravityStrength;
            world.gravity.y = 0;
            break;
        //right
        case 1:
            world.gravity.x = gravityStrength;
            world.gravity.y = 0;
            break;
        case 2:
            if (world.gravity.y == 0) {
                world.gravity.y = world.gravity.x;
                world.gravity.x = 0;
            } else {
                world.gravity.y = -world.gravity.y;
            }
            break;
        // code block
    }
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

function setGravityStrength() {
    gravityStrength = document.getElementById("gravityStrength").value / 20;
    console.log(gravityStrength);

    if (world.gravity.x > 0) {
        world.gravity.x = gravityStrength;
    } else if (world.gravity.x < 0) {
        world.gravity.x = -gravityStrength;
    } else {
        world.gravity.y = gravityStrength;
    }
}

listener.simple_combo("ctrl z", function () {
    undo();
});

listener.simple_combo("ctrl s", function () {
    cursor.dontShow();
    saveDoc(document.getElementById("docTitle").textContent);
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 186 && e.keyCode <= 192 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 219 && e.keyCode <= 222) {
        var c = e.key;
        cursor.step(bodySize);
        letters.push(new Letter(cursor.x, cursor.y, bodySize, c, font, fontSize, textOffsetX, textOffsetY));
    }
    //space
    if (e.keyCode == 32) {
        cursor.step(bodySize);
        e.preventDefault();
    }
    //backspace
    if (e.keyCode == 8) {
        undo();
    }
    //enter
    if (e.keyCode == 13) {
        cursor.stepDown(bodySize);
    }
    console.log("pressed " + e.key + " " + e.keyCode);
}, false);

function draw() {
    background(255);
    Matter.Engine.update(engine);
    letters.forEach(function (element) {
        return element.show();
    });

    /*
    leftWall.show_debug();
    rightWall.show_debug();
    topWall.show_debug();
    bottomWall.show_debug();
    */
    cursor.show(bodySize);
}