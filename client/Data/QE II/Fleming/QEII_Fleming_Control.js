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

	'click div.colourBoxSmall': function(event) {
		document.querySelectorAll('div.feltSwatch')[0].style.left = 0;
	},
	'click [data-action="colour-select"]': function(event) {
		console.log('check');
		var currentDoc = Docs.findOne(),
				selectedObject = Session.get('selectedObject'),
				collection = currentDoc.data[selectedObject.type + 's']
				
		for (var i = 0; i < collection.length; i++) {
			if (collection[i].id.toString() === selectedObject.id.toString()) {
				collection[i].colour = {
					hash: event.target.style.backgroundColor,
					rgb: event.target.getAttribute('data-rgb'),
					name: event.target.parentElement.innerText
				}
			}
		}
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		document.querySelectorAll('div.feltSwatch')[0].style.left = '-250px';
	},

	'input [data-action="input"]': function() {
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
	'change [data-action="check"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id,
				collection = event.target.getAttribute('data-collection'),
				property = event.target.getAttribute('data-property');
		for (var i = 0; i < doc.data[collection].length; i++) {
			if (doc.data[collection][i].id.toString() === id.toString()) {
				doc.data[collection][i][property] = event.target.checked;
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
			defaults.positionX = 0;
		} else if (type === 'setGraphics') {
			defaults.positionX = -2;
			defaults.positionY = 1.6;
			defaults.size = 0.5;
		} else if (type === 'recesses') {
			defaults.positionX = -2;
		} else if (type === 'lecterns') {
			defaults.positionX = 2.3;
			defaults.type = 'Felt';
			defaults.logo = 'None';
			defaults.logoSize = 0.23;
			defaults.colour = {hash: '#000000', rgb: '0 0 0'};
		} else if (type === 'topTables') {
			defaults.positionX = -2.4;
			defaults.size = 4;
			defaults.type = 'Top Table';
			defaults.colour = {hash: '#000000', rgb: '0 0 0'};
		}
		
		if (!doc.data[type]) {
			doc.data[type] = [];
		}

		doc.data[type].push(defaults);
		Docs.update(doc._id, {$set: {data: doc.data}});

	},
	
	'change [data-global="change"]': function(event) {
		var doc = Docs.findOne(),
				property = event.target.getAttribute('data-property');
		if (doc && property) {
			doc.data[property] = event.target.value;
			Docs.update(doc._id, {$set: {data: doc.data}});
		}
	},
	
	'click [data-action="saveView"]': function() {
		//Get data url from the runtime
		var imgUrl = document.getElementById("canvas").runtime.getScreenshot();

		//...and download link
		var newScreenshotDownloadLink = document.createElement('a');
		newScreenshotDownloadLink.href = imgUrl;
		newScreenshotDownloadLink.download = Docs.findOne().name + '.png';
		newScreenshotDownloadLink.innerHTML = "<br/>Download Image";
		$('#screenshotPreviews').append(newScreenshotDownloadLink); // append in order for click() to work across widest range of browsers
		newScreenshotDownloadLink.click();
	}

});
