selected_movement = [];
selected_movement.StateEstimates = [];
p5.disableFriendlyErrors = true; // disables FES
movements_list = [];
detections_list = [];
minframe = 0;
maxframe = 500;

background_color = '#272822';
movement_color = '#ae81ff';
detection_color = '#f8f8f2';
endpoint_color = '#f92672';
startpoint_color = '#a6e22e';
endpoint_radius = 8;

function setup()
{
	var canvas = createCanvas(1000, 700, WEBGL);
	canvas.parent('display');
	frameRate(5); // Attempt to refresh at starting FPS
}

function set_theme_monokai()
{
	background_color = '#272822';
	movement_color = '#ae81ff';
	detection_color = '#f8f8f2';
	endpoint_color = '#f92672';
	startpoint_color = '#a6e22e';	
}

function set_theme_solarized()
{
	background_color = '#002b36';
	movement_color = '#268bd2';
	detection_color = '#586e75';
	endpoint_color = '#cb4b16';
	startpoint_color = '#2aa198';	
}

function resetview()
{
	camera(1000, -500, maxframe+500, 320, 240, minframe, 0, 0, -1);
}

function draw_movement(state_estimates_list, frame)
{
	if(frame < minframe || frame > maxframe)
	{
		return;
	}

	var first_state_estimate = state_estimates_list[0];
	var last_state_estimate = state_estimates_list[state_estimates_list.length -1];
	
	draw_ellipse(first_state_estimate.X,first_state_estimate.Y,frame,startpoint_color,endpoint_radius); 
	draw_ellipse(last_state_estimate.X,last_state_estimate.Y,frame + state_estimates_list.length -1,endpoint_color,endpoint_radius); 
	
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

function draw_ellipse(x,y,z,color,diameter)
{
	push();
	translate(x,y,z);
	stroke(color);
	fill(color);
	ellipse(diameter,diameter,diameter);
	pop();
}

function draw_line(x1,y1,z1,x2,y2,z2)
{
	push();
	stroke(movement_color);
	strokeWeight(1);
	line(x1,y1,z1,x2,y2,z2);
	pop();
}

function draw_point(x,y,z)
{
	push();
	stroke(detection_color);
	strokeWeight(2);
	point(x,y,z);
	pop();
}

function draw()
{
	background(background_color);
	orbitControl();
	
	minframe = detections_list.length * ((document.getElementById('startrange').value)/1000.0);
	maxframe = detections_list.length * ((document.getElementById('endrange').value)/1000.0);
	
	if(movements_list.length == 0 && detections_list.length == 0)
	{
		fill(detection_color);
		stroke(movement_color);
		box();
	}
	
	movements_list.forEach(function(movement) {
		if(movement.FirstDetectionFrame < minframe || movement.FirstDetectionFrame > maxframe)
		{
			return;
		}
		draw_movement(movement.StateEstimates, movement.FirstDetectionFrame);
	});
	
	detections_list.forEach(function(detections,index) {
		if(index < minframe || index > maxframe)
		{
			return;
		}
		detections.Measurements.forEach(function(detection) {
			draw_point(detection.X, detection.Y, index);
		});
	});
}