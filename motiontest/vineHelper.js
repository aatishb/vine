function vine(numPoints, texture, scale){
  this.points = [];

  for (var i = 0; i < numPoints; i++)
  {
    this.points.push(new PIXI.Point(0, 0));
  }

  this.strip = new PIXI.mesh.Rope(texture, this.points);
  this.strip.scale.x = scale.x;
  this.strip.scale.y = scale.y;
  this.strip.x = 20;
  this.strip.y = renderer.height/2;

  this.g = new PIXI.Graphics();
  this.g.x = this.strip.x;
  this.g.y = this.strip.y;
  this.strip.scale.x = scale.x;
  this.strip.scale.y = scale.y;


  this.startMoving = function() {

      var duration = 5;  //duration (in seconds)

      var path = this.createPoints();

      for (var i = 0; i < numPoints; i++)
      {
          //create a tween for the point that travels the full path of the bezier
          var t = TweenMax.to(this.points[i], duration, {bezier:path, paused:true, ease:Linear.easeNone});
          //tween the progress of the tween so that each dot only travels a decreasing percentage of the full path
          TweenLite.to(t, duration , {progress:(i+1)/numPoints, ease:Linear.easeNone});//, delay:j*0.3});
      }

      //TweenLite.to(strip.scale, duration, {y: 0.8});

  }


  this.createPoints = function() {

    var newPoints = [{x:this.points[numPoints-1].x*this.strip.scale.x, y:this.points[numPoints-1].y*this.strip.scale.y}];
    var length = 1;
    var count  = 70;
    var dx = 10*length;
    var wiggliness = 0.014*length;
    for (var i = 1; i <= count; i++)
    {
      newPoints.push(
      {
        x: newPoints[0].x + dx * i,
        y: newPoints[i - 1].y + i * wiggliness * (randomBetween(0,21) - 10)
      });
    }

    for (var i=0; i<newPoints.length; i++)
    {
      newPoints[i].x = newPoints[i].x/scale.x;
      newPoints[i].y = newPoints[i].y/scale.y;
    }

    return newPoints;

  }

  this.showSkeleton = function() {

      this.g.clear();

      this.g.lineStyle(2,0xffc2c2);
      this.g.moveTo(this.points[0].x,this.points[0].y);

      for (var i = 1; i < this.points.length; i++) {
          this.g.lineTo(this.points[i].x,this.points[i].y);
      };

      for (var i = 0; i < this.points.length; i++) {
          this.g.beginFill(0xff0022);
          this.g.drawCircle(this.points[i].x,this.points[i].y,10);
          this.g.endFill();
      };
  }


}

function randomBetween(start, stop){
    return Math.random()*(stop - start) + start;
}