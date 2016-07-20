var renderer = PIXI.autoDetectRenderer(800, 600); // Create the renderer
renderer.backgroundColor = 0x423643; // Set the background color
document.body.appendChild(renderer.view); // Append renderer to the body of the page

var stage = new PIXI.Container();
var count = 0;
var vineTexture = PIXI.Texture.fromImage('vine.png');

var numPoints = 100;
var vineScale = {x:0.25, y:0.25};

var vines = [];

for(var i=0; i<10; i++){
  vines.push(new vine(numPoints,vineTexture,vineScale));
  vines[i].strip.y = randomBetween(0,renderer.height);
  stage.addChild(vines[i].strip);
  stage.addChild(vines[i].g);
}

//stage.interactive = true;
//strip.on('mouseover', onButtonDown);


// start animating
requestAnimationFrame(animate);
for(var i=0; i<10; i++){
  vines[i].startMoving();
}

function animate() {

    count += 0.1; //keeps track of time
    // render it all
    //vines[0].showSkeleton();      // display skeleton
    renderer.render(stage);         // render stage
    requestAnimationFrame(animate); // animate next frame
}






