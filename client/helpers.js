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

UI.registerHelper('Id', function() {
	var doc = Docs.findOne();
	if (doc) {
		return doc._id;
	}
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
		if (objects) {
			for (var i = 0; i < objects.length; i++) {
				if (objects[i].id.toString() === selected.id.toString()) {
					return objects[i];
				}
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


// FOR 3D
UI.registerHelper('isSelected', function(type, id) {
	var selectedObject = Session.get('selectedObject');
	if (selectedObject) {
		if (selectedObject.type === type && selectedObject.id.toString() === id.toString()) {
			return 'true';
		}
	}
	return 'false';
});
	
UI.registerHelper('opposite', function(value) {
	return 0 - Number(value);
});

UI.registerHelper('path', function() {
	if (this.content === 'Path') {
		return 'http://' + this.contentPath;
	} else {
		return getHost() + '/resource/' + Docs.findOne()._id + '/' + this.content;
	}
});
	
UI.registerHelper('isImage', function(path) {
	if (path) {
		return (path.toLowerCase().indexOf('png') !== -1) || (path.toLowerCase().indexOf('jpg') !== -1)
	}
});
UI.registerHelper('isMovie', function(path) {
	if (path) {
		return (path.toLowerCase().indexOf('mp4') !== -1) || (path.toLowerCase().indexOf('gif') !== -1)
	}
});

UI.registerHelper('comfyChairs', function(size, position) {
	var chairs = [],
			rotation = -2.14,
			xPos = Number(position);

	for(var i = 0; i < size; i++) {
		xPos = xPos + 0.6
		rotation = rotation - 0.2
		chairs.push({
			positionX: xPos,
			rotation: 3.14 //rotation
		});
	}

	return chairs;
});

UI.registerHelper('setGraphicsScale', function(size, setGraphic) {
	var img = Resources.findOne({name: setGraphic});
	if (img) {
		return size + ' ' + (size / img.aspectRatio) + '  0.01';
	} else {
		return '0.4 0.4 0';
	}
});

UI.registerHelper('lecternLogoPositionY', function(size, logo) {
	var img = Resources.findOne({name: logo}),
			height = 0;
	if (img) {
		height = size / img.aspectRatio;
		return 1 - height - 0.02;
	}
});
