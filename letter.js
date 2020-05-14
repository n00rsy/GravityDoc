var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Letter = function () {
    function Letter(x, y, bodySize, c, font, fontSize, offsetX, offsetY, exitForce, randomForce, fontStyle, underline, textColor) {
        _classCallCheck(this, Letter);

        this.body = Matter.Bodies.rectangle(x, y, bodySize, bodySize);
        Matter.World.add(world, this.body);

        Matter.Body.setVelocity(this.body, { x: -exitForce + randomForce, y: randomForce });
        Matter.Body.setAngularVelocity(this.body, randomForce / 13);

        this.bodySize = bodySize;
        this.font = font;
        this.fontSize = fontSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fontStyle = fontStyle;
        this.textColor = textColor;

        if (underline) {
            this.underlinePos = this.bodySize / 2 + 2;
            this.underlineSize = underline ? bodySize * 0.04 : 0;
            this.drawLetter = this.drawWithUnderline;
        } else {
            this.drawLetter = this.drawWithoutUnderline;
        }
        this.c = c;
    }

    _createClass(Letter, [{
        key: "show",
        value: function show() {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            this.drawLetter();
            pop();
        }
    }, {
        key: "drawWithUnderline",
        value: function drawWithUnderline() {
            rectMode(CENTER);
            fill(this.textColor);
            rect(0, this.underlinePos, this.bodySize, this.underlineSize);

            textSize(this.fontSize);
            textStyle(this.fontStyle);
            textFont(this.font);
            text(this.c, this.offsetX, this.offsetY);
        }
    }, {
        key: "drawWithoutUnderline",
        value: function drawWithoutUnderline() {
            //noFill();
            //rect(0,0,this.bodySize,this.bodySize);
            fill(this.textColor);
            textSize(this.fontSize);
            textStyle(this.fontStyle);
            textFont(this.font);
            text(this.c, this.offsetX, this.offsetY);
        }
    }, {
        key: "drawWithColors",
        value: function drawWithColors() {
            fill(red, green, blue);
            textSize(this.fontSize);
            textStyle(this.fontStyle);
            textFont(this.font);
            text(this.c, this.offsetX, this.offsetY);
        }
    }, {
        key: "remove",
        value: function remove() {
            Matter.Composite.remove(world, this.body);
        }
    }, {
        key: "add",
        value: function add() {
            Matter.Composite.add(world, this.body);
        }
    }]);

    return Letter;
}();