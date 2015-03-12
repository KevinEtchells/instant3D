Template.QEII_Fleming_Control.helpers({

	'selectedObject': function() {
		return Session.get('selectedObject');
	},
	'selectedObjectType': function(type1, type2) {
		var selectedObject = Session.get('selectedObject');
		if (selectedObject) {
			return selectedObject.type === type1 || selectedObject.type === type2;
		}
	},

	'selectedScreen': function() {

		var screenId = Session.get('selectedObject').id;
				screens = Docs.findOne().data.screens;

		for (var i = 0; i < screens.length; i++) {
			if (screens[i].id.toString() === screenId.toString()) {
				return screens[i];
			}
		}

	},

	'setGraphicsSize': function(size, setGraphic) {
		var img = Resources.findOne({name: setGraphic});
		if (img) {
			return Math.round(size * 3048) + 'mm x ' + Math.round((size / img.aspectRatio) * 3048) + 'mm';
		} else {
			return '';
		}
	},

});


Template.QEII_Fleming_Control.events({

	'click [data-action="addScreen"]': function() {
		var doc = Docs.findOne(),
				newId = Date.now();

		doc.data.screens.push({name: 'Screen ' + (doc.data.screens.length + 1), id: newId, ratio: '4:3', type: 'Standard'});
		Docs.update(doc._id, {$set: {data: doc.data}});

	},
	
	'change [data-action="screenContentChange"]': function(event) {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].content = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},
	'change [data-action="screenContentPathChange"]': function(event) {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].contentPath = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},
	'click [data-action="resetScreenPos"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].positionX = 0;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},
	'click [data-action="removeScreen"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens.splice(i, 1);
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
	},

	'click div.colourBoxSmall': function(event) {
		document.querySelectorAll('div.feltSwatch')[0].style.left = 0;
	},

	'click div.colourBoxMedium': function(event) {

		var currentDoc = Docs.findOne();
		currentDoc.data.modPanelColour = event.target.style.backgroundColor
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});

		document.querySelectorAll('div.feltSwatch')[0].style.left = '-250px';
	}

});
