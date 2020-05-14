var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageBody = function () {
    function ImageBody(x, y, img, exitForce, randomForce) {
        _classCallCheck(this, ImageBody);

        this.img = img;
        this.height = canvas.height * 0.2;
        this.width = this.height / img.height * img.width;

        this.body = Matter.Bodies.rectangle(x, y, this.width, this.height);
        Matter.World.add(world, this.body);

        Matter.Body.setVelocity(this.body, { x: -exitForce + randomForce, y: randomForce });
        Matter.Body.setAngularVelocity(this.body, randomForce / 13);

        this.drawImg = this.drawNormalImg;
    }

    _createClass(ImageBody, [{
        key: "show",
        value: function show() {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            this.drawImg();
            pop();
        }
    }, {
        key: "drawNormalImg",
        value: function drawNormalImg() {
            noFill();
            rectMode(CENTER);
            //rect(0,0,this.width,this.height);
            imageMode(CENTER);
            image(this.img, 0, 0, this.width, this.height);
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

    return ImageBody;
}();