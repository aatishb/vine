/**
opts =
{
  width: number (width of renderer),
  height: number (height of renderer),
  pointCount: number (points in the skeleton),
  ropeLength: number (length of the skeleton),
  backgroundColor: number (hex color),
  textureImage: string (file path)
}
*/
var VineRenderer = function(opts) {
  opts = opts || {};

  // setup renderer
  var renderer = PIXI.autoDetectRenderer(opts.width || 800, opts.height || 600);
  var stage = new PIXI.Container();

  renderer.backgroundColor = opts.backgroundColor || 0x423643;

  // state
  var pointCount = opts.pointCount || 20;
  var ropeLength = opts.ropeLength || 300;
  var points = [];

  // initialize
  for (var i = 0; i < pointCount; i++) {
    points.push(new PIXI.Point(i * ropeLength / pointCount, 0));
  }

  var snakeTexture = PIXI.Texture.fromImage(opts.textureImage || 'vine.png');
  var snake = new PIXI.mesh.Rope(snakeTexture, points);

  var snakeScale = 0.5;
  snake.scale.set(snakeScale); // TODO
  snake.x = renderer.width/2;
  snake.y = renderer.height;
  snake.rotation = -3.14/2;
  stage.addChild(snake);

  var g = new PIXI.Graphics();
  g.x = snake.x;
  g.y = snake.y;
  g.rotation = snake.rotation;
  g.scale.set(snakeScale);
  stage.addChild(g);

  // functions
  function render() {
    renderer.render(stage);
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

  function updatePoints(fun) {
    fun(points);
  }

  function move(){

    var duration = 10;

    for (var i = 0; i < pointCount; i++)
    {
        //create a tween for the point that travels the full path of the bezier
        var t = TweenMax.to(points[i], duration, {bezier:{type:"cubic", values:bezierPoints}, paused:true, ease:Linear.easeNone});
        //tween the progress of the tween so that each dot only travels a decreasing percentage of the full path
        TweenLite.to(t, duration, {progress:i/pointCount, ease:Linear.ease});
    }

  }

  // expose public properties
  return {
    view: renderer.view,
    pointCount: pointCount,
    ropeLength: ropeLength,
    updatePoints: updatePoints,
    render: render,
    move: move,
    renderPoints: renderPoints
  };

}
