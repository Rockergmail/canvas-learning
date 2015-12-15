var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;

// -------------------------------------------------------------

// objects :
//按功能分模块
function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

// -------------------------------------------------------------

// draw functions :

function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCircle(ctx, x, y, radius) { // draw circle function
    // 为什么要这样↑ 
    //从功能上似乎没有原因，我猜是因为它被drawScene调用了，可能也有闭包的考虑？
    ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    ctx.beginPath(); // custom shape begin
    ctx.fillStyle = 'rgba(255, 110, 110, 0.5)';
    ctx.moveTo(circles[0].x, circles[0].y);
    for (var i=0; i<circles.length; i++) {
        ctx.lineTo(circles[i].x, circles[i].y);
    }
    ctx.closePath(); // custom shape end
    ctx.fill(); // fill custom shape

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.stroke(); // draw border

    for (var i=0; i<circles.length; i++) { // display all our circles
        drawCircle(ctx, circles[i].x, circles[i].y, (hoveredCircle == i) ? 25 : 15);
    }
}//既然在这里设置了它的radius，为什么还要在object上加radius属性？
//如果是基于功能的话。。然并卵。
//如果是基于习惯的话，应该就是它本来的属性？
// -------------------------------------------------------------

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var circleRadius = 15;
    var width = canvas.width;
    var height = canvas.height;

    var circlesCount = 7; // we will draw 7 circles randomly
    for (var i=0; i<circlesCount; i++) {
        var x = Math.random()*width;
        var y = Math.random()*height;
        circles.push(new Circle(x,y,circleRadius));
    }

    // binding mousedown event (for dragging)
    $('#scene').mousedown(function(e) {
        var canvasPosition = $(this).offset();
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        for (var i=0; i<circles.length; i++) { // checking through all circles - are mouse down inside circle or not
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                selectedCircle = i;
                break;
            }
        }
    });

    $('#scene').mousemove(function(e) { // binding mousemove event for dragging selected circle
            var mouseX = e.layerX || 0;
            var mouseY = e.layerY || 0;
        if (selectedCircle != undefined) {
            var canvasPosition = $(this).offset();

            var radius = circles[selectedCircle].radius;
            circles[selectedCircle] = new Circle(mouseX, mouseY,radius); // changing position of selected circle
        }

        hoveredCircle = undefined;
        for (var i=0; i<circles.length; i++) { // checking through all circles - are mouse down inside circle or not
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                hoveredCircle = i;
                break;
            }
        }
    });

    $('#scene').mouseup(function(e) { // on mouseup - cleaning selectedCircle
        selectedCircle = undefined;
    });

    setInterval(drawScene, 30); // loop drawScene
});

//主要的链条：抓住鼠标触发的功能，用canvas实现的交互，还是借助于监听，不过都是对于canvas一个对象的来监听；跟画在canvas里面的元素的属性来交互
//判断在不在隔壁的方法：mousedistance^2<radius^2
//所谓的动态变化，只不过是基于覆盖或者clearRect然后不断地重画