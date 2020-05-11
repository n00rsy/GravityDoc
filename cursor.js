var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
    function Cursor(x, y, cursorBoundX, cursorBoundY) {
        _classCallCheck(this, Cursor);

        this.x = x;
        this.y = y;
        this.cursorBoundX = cursorBoundX;
        this.cursorBoundY = cursorBoundY;
        this.i = 0;
        this.letterSpacing = 1;
        this.lineSpacing = 4;
    }

    _createClass(Cursor, [{
        key: "step",
        value: function step(bodySize) {
            if (this.x + bodySize + this.letterSpacing < width - cursorBoundX) {
                this.x += bodySize + this.letterSpacing;
            } else {
                if (this.y + bodySize + this.lineSpacing < height - this.cursorBoundY) {
                    this.x = this.cursorBoundX;
                    this.y += bodySize + this.lineSpacing;
                } else {
                    this.y = this.cursorBoundX;
                    this.x = this.cursorBoundY;
                }
            }
        }
    }, {
        key: "stepBack",
        value: function stepBack(bodySize) {
            if (this.x - bodySize - this.letterSpacing > cursorBoundX) {
                this.x -= bodySize - this.letterSpacing;
            } else {
                if (this.y - bodySize - this.lineSpacing > this.cursorBoundY) {
                    this.x = width - this.cursorBoundX;
                    this.y -= bodySize - this.lineSpacing;
                } else {
                    this.y = this.cursorBoundX;
                    this.x = this.cursorBoundY;
                }
            }
        }
    }, {
        key: "stepDown",
        value: function stepDown(bodySize) {
            if (this.y + bodySize < height - cursorBoundY) {
                this.y = this.y + bodySize;
            }
        }
    }, {
        key: "show",
        value: function show(bodySize) {
            if (this.i < 60) {
                fill(255);
                rectMode(CENTER);
                rect(this.x, this.y, 0.5, bodySize + 2);
            }
            if (this.i == 80) {
                this.i = 0;
            }

            this.i++;
        }
    }, {
        key: "dontShow",
        value: function dontShow() {
            fill(0);
            rect(this.x, this.y, 0.5, bodySize + 2);
        }
    }]);

    return Cursor;
}();