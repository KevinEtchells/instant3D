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

	'click input.checkbox': function(event) {

		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = currentDoc.data[property] ? false : true;
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});

	},
	
	'click input.radio': function(event) { // this currently only does booleans

		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = (event.target.value === 'true');
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});

	},


	'change input[type="text"]': function(event) {

		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = event.target.value;
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		
	},
	'change input[type="range"]': function(event) {

		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = event.target.value;
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		
	},
	'change input[type="number"]': function(event) {

		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = event.target.value;
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		
	},
	
	'click select': function(event) {
		
		var update = {},
			currentDoc = Docs.findOne(),
			property = event.target.getAttribute('property');

		currentDoc.data[property] = event.target.value;
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		
	},

	'change input.upload': function(event) {
			var docId = Docs.findOne()._id;

		_.each(event.target.files, function(file) {
			var fileReader = new FileReader();
			fileReader.onload = function(file) {
				
				var img = new Image();
				img.onload = function() {
					
					Resources.insert({
						name: name,
						file: file.target.result,
						doc: docId,
						aspectRatio: this.width / this.height
					});
					
				};
				img.src = file.target.result;
				
				var name = event.target.value.replace('C:\\fakepath\\', '');	

			}
			fileReader.readAsDataURL(file);
		});
	}

});
