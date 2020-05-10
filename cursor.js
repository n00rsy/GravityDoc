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
    }

    _createClass(Cursor, [{
        key: "step",
        value: function step() {
            if (this.x + 21 < width - cursorBoundX) {
                this.x += 21;
            } else {
                if (this.y + 24 < height - this.cursorBoundY) {
                    this.x = this.cursorBoundX;
                    this.y += 24;
                } else {
                    this.y = this.cursorBoundX;
                    this.x = this.cursorBoundY;
                }
            }
        }
    }, {
        key: "stepBack",
        value: function stepBack() {
            if (this.x - 21 > cursorBoundX) {
                this.x -= 21;
            } else {
                if (this.y - 24 > this.cursorBoundY) {
                    this.x = width - this.cursorBoundX;
                    this.y -= 24;
                } else {
                    this.y = this.cursorBoundX;
                    this.x = this.cursorBoundY;
                }
            }
        }
    }, {
        key: "show",
        value: function show() {
            if (this.i < 60) {
                fill(255);
                rect(this.x, this.y, 0.5, 20);
            }
            if (this.i == 80) {
                this.i = 0;
            }

            this.i++;
        }
    }]);

    return Cursor;
}();