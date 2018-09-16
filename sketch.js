function setup()
{
	var canvas = createCanvas(400, 600, WEBGL);
	canvas.parent('display');
}

function draw()
{
	background(255);
	orbitControl();
	box();
}