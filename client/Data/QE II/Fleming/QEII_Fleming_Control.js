Template.QEII_Fleming_Control.helpers({

	'selectedObject': function(type) {
		var selected = Session.get('selectedObject');
		if (selected && type) {
			var objects = Docs.findOne().data[type];
			for (var i = 0; i < objects.length; i++) {
				if (objects[i].id.toString() === selected.id.toString()) {
					return objects[i];
				}
			}
		}
	},
	'selectedObjectType': function(type1, type2) {
		var selectedObject = Session.get('selectedObject');
		if (selectedObject) {
			return selectedObject.type === type1 || selectedObject.type === type2;
		}
	},

	'setGraphicsSize': function(size, setGraphic) {
		var img = Resources.findOne({name: setGraphic});
		if (img) {
			return Math.round(size * 3048) + 'mm x ' + Math.round((size / img.aspectRatio) * 3048) + 'mm';
		} else {
			return '';
		}
	}

});


Template.QEII_Fleming_Control.events({

	'dblclick [data-reset="screenPosition"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].positionX = 0;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
		previousPositions = {} // to prevent position jumping if drag-drop
		event.target.value = 0; // need to force refresh
	},

/*
	'click div.colourBoxSmall': function(event) {
		document.querySelectorAll('div.feltSwatch')[0].style.left = 0;
	},

	'click div.colourBoxMedium': function(event) {

		var currentDoc = Docs.findOne();
		currentDoc.data.modPanelColour = event.target.style.backgroundColor
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});

		document.querySelectorAll('div.feltSwatch')[0].style.left = '-250px';
	},
*/

	'input [data-action="change"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id,
				collection = event.target.getAttribute('data-collection'),
				property = event.target.getAttribute('data-property');
		for (var i = 0; i < doc.data[collection].length; i++) {
			if (doc.data[collection][i].id.toString() === id.toString()) {
				doc.data[collection][i][property] = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},
	'change [data-action="change"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id,
				collection = event.target.getAttribute('data-collection'),
				property = event.target.getAttribute('data-property');
		for (var i = 0; i < doc.data[collection].length; i++) {
			if (doc.data[collection][i].id.toString() === id.toString()) {
				doc.data[collection][i][property] = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},

	'click [data-action="remove"]': function(event) {

		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id,
				type = event.target.getAttribute('data-collection');

		for (var i = 0; i < doc.data[type].length; i++) {
			if (doc.data[type][i].id.toString() === id.toString()) {
				doc.data[type].splice(i, 1);
			}
		}

		Docs.update(doc._id, {$set: {data: doc.data}});

	},

	'click [data-action="add"]': function(event) {

		var defaults = {id: Date.now()},
				doc = Docs.findOne(),				
				type = event.target.getAttribute('data-collection');

		if (type === 'screens') {
			defaults.ratio = '4:3';
			defaults.type = 'Standard';
		} else if (type === 'setGraphics') {
			defaults.positionX = -2;
			defaults.size = 0.5;
		} else if (type === 'recesses') {
			defaults.positionX = -2;
		} else if (type === 'lecterns') {
			defaults.positionX = 2.3;
			defaults.type = 'Felt';
		}
		
		if (!doc.data[type]) {
			doc.data[type] = [];
		}

		doc.data[type].push(defaults);
		Docs.update(doc._id, {$set: {data: doc.data}});

	}

});
