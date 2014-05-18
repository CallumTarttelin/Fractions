
var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");

var top = ((2 * Math.PI)/ 4) * 3;

var validValues = [2,3,4,6,8,12,16];
var segments = validValues[Math.floor(Math.random() * validValues.length)];

var fraction = Math.floor(Math.random() * (segments - 1)) + 1;

function reduce(numerator,denominator) {
    var gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
}

var simplifiedFraction = reduce(fraction, segments);

$("#fraction").text(simplifiedFraction[0] + "/" + simplifiedFraction[1]);
var centre = {x: 100, y: 100, radius: 80};

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

    this.draw = function(context, fillColour) {
        context.fillStyle = fillColour ? fillColour : "#FFFFFF";
        context.beginPath();
        context.moveTo(centre.x, centre.y);
        context.lineTo(centre.x + (centre.radius * Math.cos(rad(this.angle * this.id))), centre.y + (centre.radius * Math.sin(rad(this.angle * this.id))));
        context.arc(centre.x, centre.y, centre.radius, rad(this.angle * this.id), rad(this.angle * (this.id + 1)));
        context.lineTo(centre.x, centre.y);
        context.fill();
        context.stroke();
    };

    this.isClicked = function(x, y) {
        var hypotenusifier = (x - centre.x) * (x - centre.x) + (y - centre.y) * (y - centre.y);
        if (Math.sqrt(hypotenusifier) > centre.radius) return false;
        var lr, ud, pos = undefined;
        if (x > centre.x) {lr = 10;} else {lr = 0;}
        if (y > centre.y) {ud = 5;} else {ud = 0;}
        if (lr + ud === 15) {pos = 2;}
        if (lr + ud === 10) {pos = 1;}
        if (lr + ud === 0) {pos = 4;}
        if (lr + ud === 5) {pos = 3;}

        var sectorifier = (360 / (2 * Math.PI) ) * Math.atan(Math.abs(x - centre.x) / Math.abs(y - centre.y));
        if (pos === 2 || pos === 4) {
        	sectorifier = 90 - sectorifier;
        }
        var angle = sectorifier + (90 * (pos - 1));
        var anglometer = (360 / segments);
        console.log("angle: " + angle);
        console.log("pos: " + pos);
        console.log("sectorifier: " + sectorifier);
        return this.id == Math.floor(angle / anglometer);
    };

    this.selected = function() {
        if (this.isSelected) {
            this.isSelected = false;
            this.draw(context, "#FFFFFF");
        } else {
            this.isSelected = true;
            this.draw(context, "#FF00FF");
        }
    };
};

function checkAnswer() {
    var actualSelected = segmentList.filter(function(segment) { return segment.isSelected}).length;
    if (actualSelected === fraction) {
        $('#result').html("YES!!!");
    } else {
        $('#result').html("NO :-(");
    }
}

for(segmentNum = 0; segmentNum < segments; segmentNum++){
    var segment = new Segment(360 / segments, segmentNum);
    segmentList.push(segment);
    segment.draw(context);
}