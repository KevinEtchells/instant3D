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
	'input input[type="range"]': function(event) {

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


/*
var filesToUpload = input.files;
var file = filesToUpload[0];

var img = document.createElement("img");
var reader = new FileReader();  
reader.onload = function(e) {img.src = e.target.result}
reader.readAsDataURL(file);

var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

var MAX_WIDTH = 800;
var MAX_HEIGHT = 600;
var width = img.width;
var height = img.height;

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
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, width, height);

var dataurl = canvas.toDataURL("image/png");
*/

		_.each(event.target.files, function(file) {

			var fileReader = new FileReader();
			fileReader.onload = function(file) {

				var name = event.target.value.replace('C:\\fakepath\\', '');	
				
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
