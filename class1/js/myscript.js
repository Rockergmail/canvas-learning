var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;

canvas = document.getElementById('scene');
ctx = canvas.getContext('2d');
width=canvas.width;
height=canvas.height;
circleRadius=15;

// --------------------------------------------

// objects :

function Circle(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function clear(){
    ctx.clearRect(0,0,width,height);
}

function drawCircle(x,y,radius){
        ctx.beginPath();
        ctx.fillStyle='pink';
        ctx.arc(x,y,radius,0,2*Math.PI,false);
        ctx.closePath();
        ctx.fill();
}


function drawScene(){
    clear();

    //draw lines
    ctx.beginPath();
    ctx.moveTo(circles[0].x,circles[0].y);
    for (var i=0;i<circles.length;i++){
        ctx.lineTo(circles[i].x,circles[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle="rgba(0,0,255,.5)";
    ctx.lineWidth='10';
    ctx.stroke();
    ctx.fillStyle="rgba(255,0,0,.5)";
    ctx.fill();

    //draw circle
    for (var i=0;i<circles.length;i++){
        drawCircle(circles[i].x,circles[i].y,hoveredCircle==i?circleRadius*1.3:circleRadius);
    }

}

$(function(){
    var circleCounts=7;

    for(var i = 0; i < circleCounts; i++){
        circles.push(new Circle(Math.random()*width,Math.random()*height,circleRadius));
    }

    console.log(circles);

    $("#scene").mousedown(function(e){
        //判断有没有选中
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        for (var i=0; i<circles.length; i++){
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var dis=(Math.pow((mouseX-circleX),2) + Math.pow((mouseY-circleY),2)) < Math.pow(circleRadius,2);
            if(dis){
                selectedCircle=i;
                break;
            }
        }
    });

    $("#scene").mousemove(function(e){
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        if(selectedCircle != undefined){
            circles[selectedCircle].x=mouseX;
            circles[selectedCircle].y=mouseY;
        }

        hoveredCircle=undefined;

        for( var i = 0 ; i < circles.length ; i++ ){
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var dis=(Math.pow((mouseX-circleX),2) + Math.pow((mouseY-circleY),2)) < Math.pow(circleRadius,2);
            if(dis){
                hoveredCircle=i;
                console.log(hoveredCircle);
                break;
            }
        }
        //如果经过红点就放大
        //如果有有选中就可以拖拉，改变它的位置，然后全部重新画
    });

    $("#scene").mouseup(function(){
        //取消选中
        selectedCircle=undefined;
    });

    setInterval(drawScene,30);

});