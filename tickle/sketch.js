// Autodetect and create the renderer
var renderer = PIXI.autoDetectRenderer(800, 600);

// Set the background color of the renderer to blue
renderer.backgroundColor = 0x423643;

// Append the renderer to the body of the page
document.body.appendChild(renderer.view);

// Create the main stage for your display objects
var stage = new PIXI.Container();

var count = 0;
var tickle = false;

// build a rope!
var ropeLength = 918 / 20;

var points = [];
var displayCircles = false;

for (var i = 0; i < 20; i++)
{
  points.push(new PIXI.Point(i * ropeLength, 0));
}

for (var i = 0; i < points.length; i++) {
    points[i].y = Math.sin(i * 0.5) * 30;
    points[i].x = i * ropeLength + Math.cos(i * 0.3) * 20;
}

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
strip.on('mouseover', startTickle);
strip.on('mouseout', stopTickle);

var g = new PIXI.Graphics();
g.x = strip.x;
g.y = strip.y;
g.scale.set(snakeScale);
stage.addChild(g);

// start animating
requestAnimationFrame(animate);

function animate() {

    count += 0.01;
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 30;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }

    if(tickle){


      var randomX = 30*Math.random()-15;
      var randomY = 30*Math.random()-15;

      for (var i = 0; i < points.length; i++) {
          points[i].y += randomY;
          points[i].x += randomX;
      }

    }

    // render it all
    renderer.render(stage);
    requestAnimationFrame(animate);
}


function startTickle() {
  tickle = true;
  console.log("in");
}

function stopTickle() {
  console.log("out");
  tickle = false;
}
