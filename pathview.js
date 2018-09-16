function TextToJSONList(text)
{
	var json_list = [];
	var json_list_strings = text.split("\n");
	json_list_strings.forEach(function(element) {
		try{
			var json_object = JSON.parse(element);
			json_list.push(json_object);
		}
		catch(e)
		{}
	});
	return json_list;
}

$('document').ready(function(){
	
	function Truncate(str) 
	{
		var truncated = jQuery.trim(str).substring(0, 20)
                          .trim(this) + "...";
		return truncated;
	}
	
	movements_list = [];
	detections_list = [];

	var movements_drop = document.getElementById('drop-movements');
	var movements_list_div = document.getElementById('trajectories-list');
	
	var detections_drop = document.getElementById('drop-detections');

	movements_drop.ondrop = function(e) {
		e.preventDefault();
		
		var file = e.dataTransfer.files[0],
		  reader = new FileReader();
		var filename = e.dataTransfer.files[0].name;
		reader.onload = function(event) {
			console.log(event.target);
			var list_text = event.target.result;
			if(filename.includes("Movements.json"))
			{
				movements_list = TextToJSONList(list_text);
				movements_list_div.innerHTML = '';
				movements_list.forEach(function(element){
					var mv = document.createElement("li");
					mv.classList.add("list-group-item");
					mv.innerHTML = Truncate(JSON.stringify(element));
					movements_list_div.appendChild(mv);    
				});
			}
			else if (filename.includes("Detections.json"))
			{
				detections_list = TextToJSONList(list_text);
			}
		};
		console.log(JSON.stringify(movements_list));
		console.log(JSON.stringify(detections_list));
		reader.readAsText(file);

		return false;
	};
	
	detections_drop.ondrop = function(e) {
		e.preventDefault();
		
		var file = e.dataTransfer.files[0],
		  reader = new FileReader();
		var filename = e.dataTransfer.files[0].name;
		reader.onload = function(event) {
			console.log(event.target);
			var list_text = event.target.result;
			if(filename.includes("Movements.json"))
			{
				movements_list = TextToJSONList(list_text);
				movements_list_div.innerHTML = '';
				movements_list.forEach(function(element){
					var mv = document.createElement("li");
					mv.classList.add("list-group-item");
					mv.innerHTML = Truncate(JSON.stringify(element));
					movements_list_div.appendChild(mv);    
				});
			}
			else if (filename.includes("Detections.json"))
			{
				detections_list = TextToJSONList(list_text);
			}
		};
		console.log(JSON.stringify(movements_list));
		console.log(JSON.stringify(detections_list));
		reader.readAsText(file);

		return false;
	};

	document.addEventListener("dragover",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);

	document.addEventListener("drop",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);
	
});

