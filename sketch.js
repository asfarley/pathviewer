selected_movement = [];
selected_movement.StateEstimates = [];

function setup()
{
	var canvas = createCanvas(400, 1000, WEBGL);
	canvas.parent('display');
}

function draw_movement(state_estimates_list, frame)
{
	state_estimates_list.forEach(function(state_estimate,index) {
		var x = state_estimate.X;
		var y = state_estimate.Y;
		var z = frame;
		draw_point(x,z,y);
	});
}

function draw_point(x,z,y)
{
	push();
	translate(x,y,z);
	stroke(0);
	ellipse(5,5,5);
	pop();
}

function draw_line(x1,y1,z1, x2,y2,z2)
{
	push();
	stroke(100);
	
	pop();
}

function draw()
{
	background(255);
	orbitControl();
	box();
	
	movements_list.forEach(function(movement) {
		draw_movement(movement.StateEstimates, movement.FirstDetectionFrame);
	});
	
}