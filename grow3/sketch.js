var degtorad = Math.PI/180;
var timeCount = 0;

window.onload = function() {
  var path = Snap("#word");
  var pathLength = Snap.path.getTotalLength(path);

  var dist = 0;

  // document.body.onclick = (function() {
  //   dist += 10;
  //   vine.updatePoints(function(points) {
  //     for (var i = 0; i < vine.pointCount; i++) {
  //       var point = path.getPointAtLength(dist * i);
  //       TweenLite.to(points[i], 3, {x: point.x * 2, y: point.y * 2});
  //     }
  //   });
  // });

  function animate() {
    timeCount += 0.01;
    if (timeCount > 3) return;
    vine.updatePoints(function(points) {
      for (var i = 0; i < vine.pointCount; i++) {
        var pos = (vine.ropeLength / vine.pointCount * (i * timeCount));
        if (pos < pathLength) {
          var point = path.getPointAtLength(pos);
          TweenLite.to(points[i], 3, {x: point.x * 5, y: point.y * 5});
        }
      }
    });
    vine.render();
    requestAnimationFrame(animate);
  }

  // view stuff
  var vine = new VineRenderer({
    height: 800,
    pointCount: 100
  });
  document.body.appendChild(vine.view);
  requestAnimationFrame(animate);
}
