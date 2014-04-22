
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
        var hypotenusifier = (x - 300) * (x - 300) + (y - 400) * (y - 400);
        if (Math.sqrt(hypotenusifier) > 100) return false;
        var LR, UD, pos = undefined;
        if (x > 300) {LR = 10} else{LR = 0};
        if (y > 400) {UD = 5} else{UD = 0};
        if (LR + UD = 15) {pos = 1};
        if (LR + UD = 10) {pos = 2};
        if (LR + UD = 0) {pos = 3};
        if (LR + UD = 5) {pos = 4};

        var sectorifier = Math.atan((x - 300) / (y - 400));
        var angle = sectorifier + (90 * (pos - 1));
        var segment_select = (360 / segments);
        return this.id == Math.floor(angle / segment_select);
        
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