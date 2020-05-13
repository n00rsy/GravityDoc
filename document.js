import _regeneratorRuntime from 'babel-runtime/regenerator';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var letters = [];
var deletedLetters = [];
var typedCharacters = [];
var deletedCharacters = [];

var myCursor = void 0;
var bottomWall = void 0,
    topWall = void 0,
    rightWall = void 0,
    leftWall = void 0;
var world = void 0,
    engine = void 0;
var mouseConstraint = void 0;

var canvas = void 0,
    canvasSize = void 0;

var fps = void 0;
var font = void 0,
    fontSize = void 0,
    fontStyle = void 0,
    underline = void 0,
    bodySize = void 0,
    textColor = void 0;
var textOffsetX = void 0,
    textOffsetY = void 0;
var gravityStrength = void 0,
    exitForce = void 0,
    randomForce = void 0;
var cursorBoundX = void 0,
    cursorBoundY = void 0;

var moveCursor = void 0,
    spaceChars = void 0;

var listener = new window.keypress.Listener();

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

    var marginSize = width * 0.125;

    bottomWall = new Boundary(width / 2, height - marginSize / 2, width, marginSize);
    topWall = new Boundary(width / 2, marginSize / 2, width, marginSize);
    rightWall = new Boundary(width - marginSize / 2, height / 2, marginSize, height);
    leftWall = new Boundary(marginSize / 2, height / 2, marginSize, height);

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
    if (mouseX > cursorBoundX && mouseX < width - cursorBoundX && mouseY > cursorBoundY && mouseY < height - cursorBoundY) {
        //move cursor to location if inside page
        myCursor.x = mouseX;
        myCursor.y = mouseY;
    } else {
        //dont show cursor

    }
}

function undo() {
    var c = typedCharacters.pop();
    if (c != null) {
        deletedCharacters.push(c);
        if (c == "\n") {
            myCursor.stepUp(bodySize, moveCursor);
        } else if (c == "\t") {
            myCursor.stepBack(bodySize, moveCursor);
            myCursor.stepBack(bodySize, moveCursor);
            myCursor.stepBack(bodySize, moveCursor);
            myCursor.stepBack(bodySize, moveCursor);
        } else {
            myCursor.stepBack(bodySize, moveCursor);
        }
        if (letters.length > 0 && c != "\t" && c != "\n" || c == " " && spaceChars) {
            letters[letters.length - 1].remove();
            deletedLetters.push(letters.pop());
        }
        /*
        if (c != "\t" && c != "\n" && (c == " " &&spaceChars) && letters.length > 0) {
            letters[letters.length - 1].remove();
            deletedLetters.push(letters.pop());
        }
        */
    }
}

function redo() {
    var c = deletedCharacters.pop();
    if (c != null) {
        typedCharacters.push(c);
        if (c == "\n") {
            myCursor.stepDown(bodySize);
        } else if (c == "\t") {
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
            myCursor.step(bodySize, moveCursor);
        } else {
            myCursor.step(bodySize, moveCursor);
        }
        if (letters.length > 0 && c != "\t" && c != "\n" || c == " " && spaceChars) {
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
    gravityStrength = document.getElementById("gravityStrength").value / 20;
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
        case "bi":
            //lol
            fontStyle = BOLDITALIC;
            break;
    }
    underline = e[2].checked;
}

function setTextColor() {
    textColor = document.getElementById("textColorPicker").value;
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

function handleKeyDown(e) {

    if (e.keyCode >= 186 && e.keyCode <= 192 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 219 && e.keyCode <= 222) {
        var c = e.key;
        myCursor.step(bodySize, moveCursor);
        var r = Math.random() * randomForce - randomForce / 2;
        letters.push(new Letter(myCursor.x, myCursor.y, bodySize, c, font, fontSize, textOffsetX, textOffsetY, exitForce, r, fontStyle, underline, textColor));
        typedCharacters.push(e.key);
    }
    //space
    else if (e.keyCode == 32) {
            myCursor.step(bodySize, moveCursor);
            e.preventDefault();
            typedCharacters.push(e.key);
            if (spaceChars) {
                var r = Math.random() * randomForce - randomForce / 2;
                letters.push(new Letter(myCursor.x, myCursor.y, bodySize, " ", font, fontSize, textOffsetX, textOffsetY, exitForce, r, fontStyle, underline, textColor));
                typedCharacters.push(e.key);
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

function addKeyListeners() {
    console.log("adding keypress listener");
    window.addEventListener("keydown", handleKeyDown, false);

    listener.simple_combo("ctrl z", function () {
        undo();
    });
    listener.simple_combo("ctrl shift z", function () {
        console.log("yeee");
        redo();
    });

    listener.simple_combo("ctrl s", function () {

        saveDoc(document.getElementById("docTitle").textContent);
    });

    listener.simple_combo("ctrl n", function () {
        newDoc();
    });
    listener.simple_combo("ctrl c", function () {
        navigator.clipboard.writeText(typedCharacters.join("")).catch(function (err) {
            console.error('Could not copy text: ', err);
        });
    });
    listener.simple_combo("ctrl v", _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var text;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return navigator.clipboard.readText();

                    case 2:
                        text = _context.sent;

                        for (i = 0; i < text.length; i++) {
                            setTimeout(function () {
                                handleKeyDown({ key: text[i], keyCode: text.charCodeAt(i) });
                            }, 100);
                        }
                        console.log(text);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));

    listener.sequence_combo("up up down down left right left right b a enter", function () {
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
    letters.forEach(function (element) {
        return element.show();
    });

    /*
    leftWall.show_debug();
    rightWall.show_debug();
    topWall.show_debug();
    bottomWall.show_debug();
    */
    myCursor.show(bodySize);
}