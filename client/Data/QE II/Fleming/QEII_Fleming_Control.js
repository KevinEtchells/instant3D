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

	// TO DO: make these DRY
	'selectedScreen': function() {
		var screenId = Session.get('selectedObject').id;
				screens = Docs.findOne().data.screens;
		for (var i = 0; i < screens.length; i++) {
			if (screens[i].id.toString() === screenId.toString()) {
				return screens[i];
			}
		}
	},
	'selectedRecess': function() {
		var recessId = Session.get('selectedObject').id;
				recesses = Docs.findOne().data.recesses;
		for (var i = 0; i < recesses.length; i++) {
			if (recesses[i].id.toString() === recessId.toString()) {
				return recesses[i];
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

	// TO DO: these can all be made much DRYer...
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
	'input [data-action="changeScreenPosition"]': function(event) {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].positionX = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
		previousPositions = {} // to prevent position jumping if drag-drop
	},
	'dblclick [data-action="changeScreenPosition"]': function() {
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

	'input [data-action="changeRecessPosition"]': function(event) {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.recesses.length; i++) {
			if (doc.data.recesses[i].id.toString() === id.toString()) {
				doc.data.recesses[i].positionX = event.target.value;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
		previousPositions = {} // to prevent position jumping if drag-drop
	},
	'click [data-action="removeRecess"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.recesses.length; i++) {
			if (doc.data.recesses[i].id.toString() === id.toString()) {
				doc.data.recesses.splice(i, 1);
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
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
	'click [data-action="addScreen"]': function() {
		var doc = Docs.findOne(),
				newId = Date.now();
		doc.data.screens.push({name: 'Screen ' + (doc.data.screens.length + 1), id: newId, ratio: '4:3', type: 'Standard'});
		Docs.update(doc._id, {$set: {data: doc.data}});
	},
	'click [data-action="addRecess"]': function() {
		var doc = Docs.findOne(),
				newId = Date.now();
		if (!doc.data.recesses) {
			doc.data.recesses = [];
		}
		doc.data.recesses.push({id: newId, positionX: -2});
		Docs.update(doc._id, {$set: {data: doc.data}});
	}

});
