Template.control.helpers({
	
	'sceneControl': function() {
		var doc = Docs.findOne(),
				company = Companies.findOne();
		if (doc && company) {
			return Template[company.name + '_' + doc.template + '_Control'];
		} else {
			return null;
		}
	},
	
	'data': function() {
		var doc = Docs.findOne();
		if (doc) {
			return doc.data;
		}
	}

});


Template.control.events({

	'click div.colourBoxSmall': function(event) {
		document.querySelectorAll('div.feltSwatch')[0].style.left = 0;
	},
	'click [data-action="colour-select"]': function(event) {

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
	
	'change [data-global="change"]': function(event) {
		var doc = Docs.findOne(),
				property = event.target.getAttribute('data-property');
		if (doc && property) {
			doc.data[property] = event.target.value;
			Docs.update(doc._id, {$set: {data: doc.data}});
		}
	},
	'input [data-global="input"]': function(event) {
		var doc = Docs.findOne(),
				property = event.target.getAttribute('data-property');
		if (doc && property) {
			doc.data[property] = event.target.value;
			Docs.update(doc._id, {$set: {data: doc.data}});
		}
	},
	'click [data-global="check"]': function(event) {
		var doc = Docs.findOne(),
				property = event.target.getAttribute('data-property');
		if (doc && property) {
			doc.data[property] = doc.data[property] ? false : true;			
			Docs.update(doc._id, {$set: {data: doc.data}});
		}
	},
	
	'input [data-action="input"]': function(event) {
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
	'change [data-action="change"]': function(event) {
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
	'change [data-action="check"]': function(event) {
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
	},

	'change input.upload': function(event) {
			var docId = Docs.findOne()._id;

		_.each(event.target.files, function(file) {

			var fileReader = new FileReader();
			fileReader.onload = function(file) {

				var name = event.target.value.replace('C:\\fakepath\\', '').replace(/\./g, '') + '.png';
				
				var img = new Image();

				img.onload = function() {
					
					var MAX_WIDTH = 800;
					var MAX_HEIGHT = 600;
					var width = this.width;
					var height = this.height;

					if (width > height) {
						if (width > MAX_WIDTH) {
							height *= MAX_WIDTH / width;
							width = MAX_WIDTH;
						}
					} else {
						if (height > MAX_HEIGHT) {
							width *= MAX_HEIGHT / height;
							height = MAX_HEIGHT;
						}
					}
					
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					Resources.insert({
						name: name,
						//file: file.target.result,
						file: canvas.toDataURL('image/png'),
						doc: docId,
						aspectRatio: this.width / this.height
					});

				};

				img.src = file.target.result;
				
				/*
				var video = document.createElement('video');
				video.oncanplaythrough = function() {
					console.log('check 3');
					console.log(this);
					console.log(this.width);
					console.log(this.height);
					Resources.insert({
						name: name,
						file: file.target.result,
						doc: docId,
						aspectRatio: this.width / this.height
					});
				};
				video.src = file.target.result;
				*/
				
			}
			fileReader.readAsDataURL(file);
		});
	}

});
