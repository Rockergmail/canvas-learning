var canvas, ctx;
var canvasWidth; 
var canvasHeight;
var world;
var iBorder = 5;

// get rand number between X and Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

$(function() {
    // create the world
    world = createWorld();

    // get canvas and context
    canvas = document.getElementById('game');  
    ctx = canvas.getContext('2d');
    canvasWidth = parseInt(canvas.width);
    canvasHeight = parseInt(canvas.height);

    // create the ground
    createGround(canvasWidth / 2, canvasHeight - iBorder, canvasWidth / 2, iBorder, 0);
    createGround(iBorder, canvasHeight / 2, iBorder, canvasHeight / 2, 0); // left border
    createGround(canvasWidth - iBorder, canvasHeight / 2, iBorder, canvasHeight / 2, 0); // right border

    // add first rand object
    addObjects();

    // draw frame
    frame();
});

// add random objects
function addObjects() {
    var iVar = getRand(1, 2);

    if (iVar == 1) {
        var x = getRand(100, 600);
        var y = 0;
        var r = getRand(10, 40);
        createCircleAt(x, y, r);
    } else if (iVar == 2) {
        var x = getRand(100, 600);
        var y = 0;
        var w = getRand(5, 40);
        var h = getRand(5, 40);
        createBoxAt(x, y, w, h);
    }

    // set timer
    setTimeout(addObjects, 500);
}

// draw frame
function frame() {
    world.Step(1.0 / 60, 1);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw world
    drawWorld(world, ctx);

    // set timer
    setTimeout(frame, 10);
}

// create world
function createWorld() {

    // set the size of the world
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);

    // Define the gravity
    var gravity = new b2Vec2(0, 200);

    // set to ignore sleeping object
    var doSleep = false;

    // finally create the world with the size, graivty and sleep object parameter.
    return new b2World(worldAABB, gravity, doSleep);
}

// create ground (box-type object)
function createGround(x, y, width, height, rotation) {
    // box shape definition
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(width, height);
    groundSd.restitution = 0.4;

    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(x, y);
    groundBd.rotation = rotation * Math.PI / 180;
    return world.CreateBody(groundBd);
}

// create box
function createBoxAt(x, y, w, h) {
    var boxSd = new b2BoxDef();
    boxSd.density = 1.0;
    boxSd.friction = 1.0;
    boxSd.restitution = .5;
    boxSd.extents.Set(w, h);

    // add to world as shape
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd);
}

// create circle
function createCircleAt(x, y, r) {
    var boxSd = new b2CircleDef();
    boxSd.density = 1.0;
    boxSd.friction = 1.0;
    boxSd.restitution = .5;
    boxSd.radius = r;

    // add to world as shape
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd);
}

// draw world
function drawWorld(world, context) {
    for (var b = world.m_bodyList; b != null; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            drawShape(s, context);
        }
    }
}

// draw shapes
function drawShape(shape, context) {
    context.strokeStyle = '#0000ff';
    context.fillStyle = 'rgba(100, 100, 255, 0.8)'; 
    context.beginPath();

    switch (shape.m_type) {
        case b2Shape.e_circleShape:
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
            break;
        case b2Shape.e_polyShape:
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
            break;
    }
    context.fill();
    context.stroke();
}