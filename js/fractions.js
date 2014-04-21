
var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");

var top = ((2 * Math.PI)/ 4) * 3;

var validValues = [2,3,4,6,8,12,16];
var segments = validValues[Math.floor(Math.random() * validValues.length)];

var fraction = Math.floor(Math.random() * (segments - 1)) + 1;

$("#fraction").text(fraction + "/" + segments);

function rad(num) {
    return (num - 90) / 360 * (2 * Math.PI);
}
var segmentList = [];

canvas.addEventListener('mousedown', function (e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    for(idx = 0; idx < segmentList.length; idx++) {
        if(segmentList[idx].isClicked(loc.x, loc.y)) {
            segmentList[idx].selected();
            break;
        }
    }
});

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
}

var Segment = function(angle, id) {
    this.angle = angle;
    this.id = id;
    this.isSelected = false;

    this.draw = function(context) {
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        context.moveTo(300, 400);
        context.lineTo(300 + (100 * Math.cos(rad(this.angle * this.id))), 400 + (100 * Math.sin(rad(this.angle * this.id))));
        context.arc(300, 400, 100, rad(this.angle * this.id), rad(this.angle * (this.id + 1)));
        context.lineTo(300, 400);
        context.fill();
        context.stroke();
    };

    this.isClicked = function(x, y) {
        return true;
    };

    this.selected = function() {
        this.isSelected = true;
        context.fillStyle = "#FF00FF";
        context.beginPath();
        context.moveTo(300, 400);
        context.lineTo(300 + (100 * Math.cos(rad(this.angle * this.id))), 400 + (100 * Math.sin(rad(this.angle * this.id))));
        context.arc(300, 400, 100, rad(this.angle * this.id), rad(this.angle * (this.id + 1)));
        context.lineTo(300, 400);
        context.fill();
        context.stroke();
    };
};

for(segmentNum = 0; segmentNum < segments; segmentNum++){
    var segment = new Segment(360 / segments, segmentNum);
    segmentList.push(segment);
    segment.draw(context);
}