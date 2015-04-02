getHost = function() {
	return window.location.origin;
};

/*
UI.registerHelper('_indexArray', function(array) {
	array.forEach(function(item, index) {
		item.index = index;
	});
	return array;
});
*/

UI.registerHelper('_host', function() {
	return getHost();
});

UI.registerHelper('_option', function(value, text, check) {
	return '<option value="' + value + '"' + (check && value.toString() === check.toString() ? 'selected' : '') + '>' + text + '</option>';
});

UI.registerHelper('_resources', function() {
	return Resources.find();
});

UI.registerHelper('_equal', function(a, b) {
	return a === b;
});

UI.registerHelper('_scale', function(value, amount) {
	return value * amount;
});


// FOR CONTROLS
UI.registerHelper('selectedObject', function(type) {
	var selected = Session.get('selectedObject');
	if (selected && type) {
		var objects = Docs.findOne().data[type];
		for (var i = 0; i < objects.length; i++) {
			if (objects[i].id.toString() === selected.id.toString()) {
				return objects[i];
			}
		}
	}
});
UI.registerHelper('selectedObjectType', function(type1, type2) {		
	var selectedObject = Session.get('selectedObject');
	if (selectedObject) {
		return selectedObject.type === type1 || selectedObject.type === type2;
	}
});
	
UI.registerHelper('setGraphicsSize', function(size, setGraphic) {
	var img = Resources.findOne({name: setGraphic});
	if (img) {
		return Math.round(size * 3048) + 'mm x ' + Math.round((size / img.aspectRatio) * 3048) + 'mm';
	} else {
		return '';
	}
});
