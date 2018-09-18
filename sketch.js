selected_movement = [];
selected_movement.StateEstimates = [];

function setup()
{
	var canvas = createCanvas(400, 400, WEBGL);
	canvas.parent('display');
}

function draw_movement(state_estimates_list, frame)
{
	state_estimates_list.forEach(function(state_estimate,index) {
		var x = state_estimate.X;
		var y = state_estimate.Y;
		var z = frame;
		//draw_point(x,z,y);
	});
	
	var i;
	for (i = 0; i < state_estimates_list.length; i++) {
		if(i+1<state_estimates_list.length)
		{
			this_state_estimate = state_estimates_list[i];
			next_state_estimate = state_estimates_list[i+1];
			draw_line(this_state_estimate.X,this_state_estimate.Y,frame,next_state_estimate.X,next_state_estimate.Y,frame+1);
		}	
	}
}

function draw_point(x,z,y)
{
	push();
	translate(x,y,z);
	stroke(0);
	ellipse(5,5,5);
	pop();
}

function draw_line(x1,y1,z1,x2,y2,z2)
{
	push();
	stroke(255,0,0);
	line(x1,y1,z1,x2,y2,z2);
	pop();
}

function draw()
{
	background(255);
	orbitControl();
	
	if(movements_list.length == 0)
	{
		box();
	}
	
	movements_list.forEach(function(movement) {
		draw_movement(movement.StateEstimates, movement.FirstDetectionFrame);
	});
	
}