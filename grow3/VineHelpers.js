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

  function updatePoints(fun) {
    fun(points);
  }

  // expose public properties
  return {
    view: renderer.view,
    pointCount: pointCount,
    ropeLength: ropeLength,
    updatePoints: updatePoints,
    render: render
  };

}
