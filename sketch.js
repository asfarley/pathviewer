selected_movement = [];
selected_movement.StateEstimates = [];
p5.disableFriendlyErrors = true; // disables FES

function setup()
{
	var canvas = createCanvas(700, 700, WEBGL);
	canvas.parent('display');
}

function draw_movement(state_estimates_list, frame)
{
	var first_state_estimate = state_estimates_list[0];
	var last_state_estimate = state_estimates_list[state_estimates_list.length -1];
	
	draw_ellipse(first_state_estimate.X,first_state_estimate.Y,frame,255,255,0,15); // First point: Yellow
	draw_ellipse(last_state_estimate.X,last_state_estimate.Y,frame + state_estimates_list.length -1,0,0,255,15); // Last point: Blue
	
	var i;
	for (i = 0; i < state_estimates_list.length; i++) {
		if(i+1<state_estimates_list.length)
		{
			this_state_estimate = state_estimates_list[i];
			next_state_estimate = state_estimates_list[i+1];
			draw_line(this_state_estimate.X,this_state_estimate.Y,frame+i,next_state_estimate.X,next_state_estimate.Y,frame+i+1);
		}	
	}
}

function draw_ellipse(x,y,z,stroke_r,stroke_g,stroke_b,diameter)
{
	push();
	translate(x,y,z);
	stroke(stroke_r, stroke_g, stroke_b);
	fill(stroke_r,stroke_g,stroke_b);
	ellipse(diameter,diameter,diameter);
	pop();
}

function draw_line(x1,y1,z1,x2,y2,z2)
{
	push();
	stroke(255,0,0);
	line(x1,y1,z1,x2,y2,z2);
	pop();
}

function draw_point(x,y,z)
{
	push();
	//translate(x,y,z);
	stroke(0);
	point(x,y,z);
	pop();
}

function draw()
{
	background(255);
	orbitControl();
	
	if(movements_list.length == 0 && detections_list.length == 0)
	{
		box();
	}
	
	movements_list.forEach(function(movement) {
		draw_movement(movement.StateEstimates, movement.FirstDetectionFrame);
	});
	
	detections_list.forEach(function(detections,index) {
		detections.Measurements.forEach(function(detection) {
			draw_point(detection.X, detection.Y, index);
		});
	});
}