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

var cursorBoundX = void 0;
var cursorBoundY = void 0;

var listener = new window.keypress.Listener();

function setup() {
    frameRate(60);
    var canvasSize = 640;
    canvas = createCanvas(canvasSize, canvasSize * 11 / 8.5);
    canvas.parent('docContainer');
    canvas.id('doc');
    engine = Matter.Engine.create();
    world = engine.world;

    world.gravity.y = 0.1;

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
    cursor.stepBack();
}

function redo() {
    if (deleted.length > 0) {
        deleted[deleted.length - 1].add();
        letters.push(deleted.pop());
    }
}

listener.simple_combo("ctrl z", function () {
    undo();
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 186 && e.keyCode <= 192 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 219 && e.keyCode <= 222) {
        var c = e.key;
        cursor.step();
        letters.push(new Letter(cursor.x, cursor.y, 20, 20, c));
    }
    //space
    if (e.keyCode == 32) {
        cursor.step();
        e.preventDefault();
    }
    //backspace
    if (e.keyCode == 8) {
        undo();
    }
    console.log("pressed " + e.key + " " + e.keyCode);
}, false);

function draw() {
    background(255);
    Matter.Engine.update(engine);
    letters.forEach(function (element) {
        return element.show();
    });

    leftWall.show_debug();
    rightWall.show_debug();
    topWall.show_debug();
    bottomWall.show_debug();

    cursor.show();
}