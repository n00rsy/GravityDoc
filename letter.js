var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Letter = function () {
    function Letter(x, y, w, h, c) {
        _classCallCheck(this, Letter);

        this.body = Matter.Bodies.rectangle(x, y, w, h);
        Matter.World.add(world, this.body);
        Matter.Body.setVelocity(this.body, { x: -1.5, y: 0 });
        this.w = w;
        this.h = h;
        this.c = c;
    }

    _createClass(Letter, [{
        key: 'show',
        value: function show() {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            //rect(0,0, this.w, this.h);
            fill(0);
            textSize(24);
            textFont('serif');
            text(this.c, -5, 10);
            pop();
        }
    }, {
        key: 'remove',
        value: function remove() {
            Matter.Composite.remove(world, this.body);
        }
    }, {
        key: 'add',
        value: function add() {
            Matter.Composite.add(world, this.body);
        }
    }]);

    return Letter;
}();