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
	
	movements_list = [];
	detections_list = [];

	var movements_drop = document.getElementById('drop-movements');

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

