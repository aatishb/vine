// Autodetect and create the renderer
var renderer = PIXI.autoDetectRenderer(800, 600);

// Set the background color of the renderer to blue
renderer.backgroundColor = 0x423643;

// Append the renderer to the body of the page
document.body.appendChild(renderer.view);

// Create the main stage for your display objects
var stage = new PIXI.Container();

var count = 0;

// build a rope!
var ropeLength = 918 / 20;

var points = [];


for (var i = 0; i < 20; i++)
{
  points.push(new PIXI.Point(i * ropeLength, 0));
}

/*
for (var i = 1; i < points.length; i++) {
    points[i].y = points[i-1].y + 20*Math.random()-10;
}
*/

var explain = new PIXI.Text('Hover over vine for skeleton',{fill: 0xd3d3d3});
explain.anchor.x = 0.5;
explain.x = renderer.width/2;
explain.y = 15;
stage.addChild(explain);

var displayCircles = false;
var circles = [];

for (var i = 0; i < 20; i++)
{
    circles.push(new PIXI.Graphics());
    circles[i].lineStyle(2, 0xd72323);  //(thickness, color)
    circles[i].drawCircle(renderer.width/2, renderer.height, i*ropeLength*0.5);   //(x,y,radius)
    circles[i].endFill();
    circles[i].visible = false;
    stage.addChild(circles[i]);
}

//var sprite = PIXI.Sprite.fromImage('vinebackground.jpg');
//stage.addChild(sprite);

var snakeTexture = PIXI.Texture.fromImage('vine.png');
var snake = new PIXI.mesh.Rope(snakeTexture, points);

var snakeScale = 0.5;
snake.scale.set(snakeScale);
snake.x = renderer.width/2;
snake.y = renderer.height;
snake.rotation = -3.14/2;
stage.addChild(snake);

snake.interactive = true;
snake.on('mouseover', onButtonDown);

var g = new PIXI.Graphics();
g.x = snake.x;
g.y = snake.y;
g.rotation = snake.rotation;
g.scale.set(snakeScale);
stage.addChild(g);



// start animating
requestAnimationFrame(animate);

function animate() {

    // make the snake wag

    var degtorad = Math.PI/180;
    count += 0.1;
    for (var i = 0; i < points.length; i++) {
        //points[i].y = Math.sin((i * 0.5) + count) * 30;
        //points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
        var currentAngle = degtorad*30*Math.sin(0.7*count+i*0.2);
        points[i].y = i * ropeLength * Math.sin(currentAngle);
        points[i].x = i * ropeLength * Math.cos(currentAngle);
    }


    // render it all
    if(displayCircles){
        renderPoints();
    }
    renderer.render(stage);
    requestAnimationFrame(animate);
}

function renderPoints () {

    g.clear();

    g.lineStyle(2,0xffc2c2);
    g.moveTo(points[0].x,points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x,points[i].y);
    };

    for (var i = 0; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x,points[i].y,10);
        g.endFill();
    };
}

function showCircles(trueorfalse){
 for(var i=0;i<20;i++){
    circles[i].visible = trueorfalse;
 }
}

function onButtonDown() {
    displayCircles = !displayCircles;
    if(displayCircles){
        showCircles(true);
        g.visible = true;
    }
    else{
        showCircles(false);
        g.visible = false;
    }
}

