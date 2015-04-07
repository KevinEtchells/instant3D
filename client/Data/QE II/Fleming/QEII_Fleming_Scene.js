Template.QEII_Fleming_Scene.helpers({

	'Id': function() {
		var doc = Docs.findOne();
		if (doc) {
			return doc._id;
		}
	},
	
	'isSelected': function(type, id) {
		var selectedObject = Session.get('selectedObject');
		if (selectedObject) {
			if (selectedObject.type === type && selectedObject.id.toString() === id.toString()) {
				return 'true';
			}
		}
		return 'false';
	},
	
	'opposite': function(value) {
		return 0 - Number(value);
	},

	'stageDepthOffset': function(value1, value2) {
		var doc = Docs.findOne();
		if (doc && doc.data.stageDepth === '1.2') {
			return value2;
		}
		return value1;
	},

/*
	'scaleSet': function(size) {
		return size/10 + 0.025;
	},
*/
	'setSections': function() { // this works out the gaps for the recesses

		var doc = Docs.findOne(),
				recesses = doc.data.recesses,
				setSections = [],
				stageWidth = doc.data.stageWidth;

		// [1] if any recesses are mirrored, add these to the array
		if (recesses) {
			recesses.forEach(function(recess) {
				if (recess.mirror) {
					var mirror = JSON.parse(JSON.stringify(recess));
					mirror.positionX = 0 - mirror.positionX;
					mirror.mirror = false;
					recesses.push(mirror);
				}
			});
		}

		// [2] sort recesses array into left-to-right order
		if (recesses) {
			recesses.sort(function(a, b) {
				return a.positionX > b.positionX;
			});
		}

		// [3] create set sections data
		setSections.push({start: stageWidth / -10});
		if (recesses) {
			for (var i = 0; i < recesses.length; i++) {
				setSections[i].width = ((recesses[i].positionX - setSections[i].start) / 2) - 0.1;
				setSections.push({start: Number(recesses[i].positionX) + 0.1});
			}
			setSections[setSections.length -1].width = (((stageWidth / 10) - recesses[recesses.length -1].positionX) / 2) - 0.05;
		} else {
			setSections[0].width = stageWidth / 10;
		}

		// [4] set sections start position must take into account their width
		setSections.forEach(function(section) {
			section.start = section.start + section.width;
		});

		return setSections;

	},

	'path': function() {
		if (this.content === 'Path') {
			return 'http://' + this.contentPath;
		} else {
			return getHost() + '/resource/' + Docs.findOne()._id + '/' + this.content;
		}
	},
	'isImage': function(path) {
		if (path) {
			return (path.toLowerCase().indexOf('png') !== -1) || (path.toLowerCase().indexOf('jpg') !== -1)
		}
	},
	'isMovie': function(path) {
		if (path) {
			return (path.toLowerCase().indexOf('mp4') !== -1) || (path.toLowerCase().indexOf('gif') !== -1)
		}
	},

	'comfyChairs': function(size, position) {
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
	},

	'setGraphicsScale': function(size, setGraphic) {
		var img = Resources.findOne({name: setGraphic});
		if (img) {
			return size + ' ' + (size / img.aspectRatio) + '  0.01';
		} else {
			return '0.5 0.5 0';
		}
	},

	'lecternLogoPositionY': function(size, logo) {
		var img = Resources.findOne({name: logo}),
				height = 0;
		if (img) {
			height = size / img.aspectRatio;
			return 1 - height - 0.02;
		}
	}

});


Template.QEII_Fleming_Scene.events({
	
});


Template.QEII_Fleming_Scene.rendered = function() {
	
	// only init x3dom if document has loaded (once we have updated iron router we can simplify this)
	var x3domInit = function() {
		if (Docs.findOne()) {
			x3dom.reload();
		} else {
			x3domInit();
		}
	}
	x3domInit();

/*
	document.querySelectorAll('x3d')[0].addEventListener('touchmove', function(event) {
		//alert(event.changedTouches[0].clientX);
		var touch = event.changedTouches[0];
		var newEvent = document.createEvent('MouseEvent');
		newEvent.initMouseEvent('mousemove', true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		touch.target.dispatchEvent(newEvent);
	}, true);
	*/
};


selectObject = function(type, id, event) {
	if (!event.isTrigger) { // filter out 2nd jQuery event fire
		var currentObject = Session.get('selectedObject');
		if (currentObject && currentObject.type === type && currentObject.id === id) {
			Session.set('selectedObject', {});
		} else {
			Session.set('selectedObject', {type: type, id: id});
		}
	}
};

