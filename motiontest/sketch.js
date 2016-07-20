var renderer = PIXI.autoDetectRenderer(800, 600); // Create the renderer
renderer.backgroundColor = 0x423643; // Set the background color
document.body.appendChild(renderer.view); // Append renderer to the body of the page

var stage = new PIXI.Container();
var vineTexture = PIXI.Texture.fromImage('vine.png');

function animate() {

    // render it all
    //vines[0].showSkeleton();      // display skeleton
    renderer.render(stage);         // render stage
    requestAnimationFrame(animate); // animate next frame
}

var numPoints = 100;
var vineScale = {x:0.25, y:0.25};
var vines = [];

for(var i=0; i<10; i++){
  vines.push(new vine(numPoints,vineTexture,vineScale));
}

// start animating
requestAnimationFrame(animate);
for(var i=0; i<10; i++){
  vines[i].startMoving();
}







