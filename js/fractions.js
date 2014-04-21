
var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");
var segments = 6;

var top = ((2 * Math.PI)/ 4) * 3;


function drawSegment(segmentNum){
    segmentNum = segmentNum - 1;
    segmentAngle = 360 / segments;
    context.beginPath();
    context.moveTo(300, 400);
    context.lineTo(300 + (100 * Math.cos(rad(segmentAngle * segmentNum))), 400 + (100 * Math.sin(rad(segmentAngle * segmentNum))));
    context.arc(300, 400, 100, rad(segmentAngle * segmentNum), rad(segmentAngle * (segmentNum + 1)));
    context.lineTo(300, 400);
    context.stroke();
}

function rad(num) {
    return (num - 90) / 360 * (2 * Math.PI);
}

for(segmentNum = 1; segmentNum <= segments; segmentNum++){

    drawSegment(segmentNum);
}

