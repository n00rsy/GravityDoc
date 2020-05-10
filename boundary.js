var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boundary = function () {
    function Boundary(x, y, w, h) {
        _classCallCheck(this, Boundary);

        this.body = Matter.Bodies.rectangle(x, y, w, h);
        this.body.isStatic = true;
        Matter.World.add(world, this.body);
        this.w = w;
        this.h = h;
    }

    _createClass(Boundary, [{
        key: "show_debug",
        value: function show_debug() {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            fill(50);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h);

            pop();
        }
    }]);

    return Boundary;
}();