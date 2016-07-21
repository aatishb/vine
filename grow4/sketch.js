var degtorad = Math.PI/180;
var timeCount = 0;
var bezierPoints;

window.onload = function() {
  var path = Snap("#word");
  //var pathLength = Snap.path.getTotalLength(path);
  var data = Snap.path.toCubic(path);
  bezierPoints = convertSVG(data);

  var dist = 0;

  for (var i=0; i<bezierPoints.length; i++){
      bezierPoints[i].x = bezierPoints[i].x*4 + 100;
      bezierPoints[i].y = bezierPoints[i].y*4 - 200;
  }


  function animate() {
    vine.render();
    //vine.renderPoints(); // show vine skeleton
    requestAnimationFrame(animate);
  }

  // view stuff
  var vine = new VineRenderer({
    height: 800,
    pointCount: 100
  });
  vine.move();

  document.body.appendChild(vine.view);
  requestAnimationFrame(animate);
}


// function from http://codepen.io/jamiejefferson/pen/ff30ccf7f3a8b69989142d664325f3b9
function convertSVG(data)
{
  var _bezierPoints = [];

  // convert cubic data to GSAP bezier
  for (var i = 0; i < data.length; i++) {
    var seg = data[i];
    if (seg[0] === "M") { // move (starts the path)
      var point = {};
      point.x = seg[1];
      point.y = seg[2];
      _bezierPoints.push(point);
    }
    else
    { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
      for (var j = 1; j < 6; j+=2)
      {
        var point = {};
        point.x = seg[j];
        point.y = seg[j+1];
        _bezierPoints.push(point);
      }
    }
  }
  return _bezierPoints;
}
