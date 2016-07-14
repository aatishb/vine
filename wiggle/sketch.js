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

var explain = new PIXI.Text('Hover over vine',{fill: 0xd3d3d3});
explain.anchor.x = 0.5;
explain.x = renderer.width/2;
explain.y = 15;
stage.addChild(explain);

//var sprite = PIXI.Sprite.fromImage('vinebackground.jpg');
//stage.addChild(sprite);

var snake = PIXI.Texture.fromImage('vine.png');

var strip = new PIXI.mesh.Rope(snake, points);

var snakeScale = 0.8;
strip.scale.set(snakeScale);
strip.x = 20;
//strip.x = (renderer.width - snakeScale*918)/2;
strip.y = renderer.height/2;
stage.addChild(strip);

strip.interactive = true;
strip.on('mouseover', onButtonDown);

var g = new PIXI.Graphics();
g.x = strip.x;
g.y = strip.y;
g.scale.set(snakeScale);
stage.addChild(g);

// start animating
requestAnimationFrame(animate);

function animate() {


    // make the snake wiggle

    count += 0.1;
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 30;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }




    // render it all
    renderer.render(stage);
    renderPoints();
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


function onButtonDown() {


  if(strip.scale.x > 0.7){
    TweenLite.to(strip.scale, 2, {x: 0.2, y: 0.2});
    TweenLite.to(g.scale, 2, {x: 0.2, y: 0.2});
  }
  if(strip.scale.x < 0.3 ){
    TweenLite.to(strip.scale, 2, {x: 0.8, y: 0.8});
    TweenLite.to(g.scale, 2, {x: 0.8, y: 0.8});
  }


}

