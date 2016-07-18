var degtorad = Math.PI/180;
var timeCount = 0;
function animate() {
  timeCount += 0.1;
  vine.updatePoints(function(points) {
    // make the snake wag
    for (var i = 0; i < vine.pointCount; i++) {
      var currentAngle = degtorad * 30 * Math.sin(0.7 * timeCount + (vine.pointCount - i) * 0.2);
      points[i].y = i * vine.ropeLength * Math.sin(currentAngle);
      points[i].x = i * vine.ropeLength * Math.cos(currentAngle);
    }
  });
  vine.render();
  requestAnimationFrame(animate);
}

// view stuff
var vine = new VineRenderer();
document.body.appendChild(vine.view);
requestAnimationFrame(animate);
