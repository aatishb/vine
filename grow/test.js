
var quantity = 30, //number of dots
	duration = 3,  //duration (in seconds)
	path = [{x:0, y:0}, {x:50, y:100}, {x:300, y:20}, {x:400, y:200}, {x:500, y:0}]; //points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.

var tl = new TimelineMax({repeat:10, yoyo:true});


//we can remove the first point on the path because the position is already there and we want to draw the Bezier from there through the other points
//path.shift();
for (i = 0; i < quantity; i++)
{
	//create a new dot, add the .dot class, set the position, and add it to the body.
	var	dot = $("<div />", {id:"dot"+i}).addClass("dot").appendTo("body");
    //create a tween for the dot that travels the full path of the bezier
    var t = TweenMax.to(dot, duration, {bezier:path, paused:true, ease:Linear.easeNone});
    //tween the progress of the tween so that each dot only travels a decreasing percentage of the full path
    TweenLite.to(t, duration - (duration * i/quantity), {progress:1- i/quantity, ease:Linear.easeNone, delay:i*0.3});
}
