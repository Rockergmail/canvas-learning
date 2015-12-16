var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;
var direction=1;
var speed=2;
var state;
var button;
var moving=false;
// --------------------------------------------

// objects :

function Circle(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Button(x,y,w,h,state,image){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.state=state;
    this.imageShift=0;
    this.image=image;
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

function animation(speed){
        circles[0].x-=speed;
        circles[0].y-=speed;
        circles[1].x+=speed;
        circles[1].y-=speed;
        circles[2].x+=speed;
        circles[2].y+=speed;
        circles[3].x-=speed;
        circles[3].y+=speed;
}

function drawScene(){
    clear();

    //draw text
    ctx.font = '42px DS-Digital';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Rocker Canvas Learning Trip', ctx.canvas.width/2, 50);

    //draw lines
    var bg_gradient = ctx.createLinearGradient(0, 200, 0, 400);
    bg_gradient.addColorStop(0.0, 'rgba(255, 0, 0, 0.8)');
    bg_gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.8)');
    bg_gradient.addColorStop(1.0, 'rgba(0, 0, 255, 0.8)');

    ctx.beginPath();
    ctx.moveTo(circles[0].x,circles[0].y);
    for (var i=0;i<circles.length;i++){
        ctx.lineTo(circles[i].x,circles[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle="rgba(0,0,255,.5)";
    ctx.lineWidth='10';
    ctx.stroke();
    // ctx.fillStyle="rgba(255,0,0,.5)";
    ctx.fillStyle=bg_gradient;
    ctx.fill();

    if(moving){
        if(direction){ //速度正方向
            if(circles[0].x<width/3){
                direction=0;
            } else {
                animation(speed);
            }
        } 
        else {  //速度反方向
            if(circles[0].x>(width/2-15)){
                direction=1;
            } else {
                animation(-speed);
            }
        }
    }

    //draw circle
    for (var i=0;i<circles.length;i++){
        drawCircle(circles[i].x,circles[i].y,hoveredCircle==i?circleRadius*1.3:circleRadius);
    }

    //draw button && text
    ctx.drawImage(button.image,0,button.imageShift,button.w,button.h,button.x,button.y,button.w,button.h);
    ctx.font = '30px DS-Digital';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(moving?'Play':'Pause', 135, 480);
    ctx.fillText(button.state, 135, 515);

}

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    width=canvas.width;
    height=canvas.height;
    circleRadius=15;

   //initial 4 balls
    circles.push(new Circle(width/2-30,height/2-30,circleRadius));
    circles.push(new Circle(width/2+30,height/2-30,circleRadius));
    circles.push(new Circle(width/2+30,height/2+30,circleRadius));
    circles.push(new Circle(width/2-30,height/2+30,circleRadius));

    //inital button
    buttonImage = new Image();
    buttonImage.src = 'images/button.png';
    buttonImage.onload = function(){
        button=new Button(50,450,180,120,'normal',this);
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

        // button behavior
        if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
            moving=!moving;
            button.state = 'pressed';
            button.imageShift = 262;
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

        if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
            button.state = 'hover';
            button.imageShift = 131;
        } else {
            button.state = 'normal';
            button.imageShift = 0;
        }

    });

    $("#scene").mouseup(function(e){
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        //取消选中
        selectedCircle=undefined;

        if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
            button.state = 'hover';
            button.imageShift = 131;
        }
    });

    setInterval(drawScene,30);

});

/*
总结：
源码有些不到位的地方，我自己加了修复：
1.动画的反转判断
2.button的状态显示
*/