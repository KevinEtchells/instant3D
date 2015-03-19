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

	'scaleSet': function(size) {
		return size/10 + 0.025;
	},
	
	'setSections': function() { // this works out the gaps for the recesses

		var doc = Docs.findOne(),
				recesses = doc.data.recesses,
				setSections = [],
				stageWidth = doc.data.stageWidth;

		// [1] sort recesses array into left-to-right order
		recesses.sort(function(a, b) {
			return a.positionX > b.positionX;
		});

		// [2] create set sections data
		setSections.push({start: stageWidth / -10});
		for (var i = 0; i < recesses.length; i++) {
			setSections[i].width = ((recesses[i].positionX - setSections[i].start) / 2) - 0.1;
			setSections.push({start: Number(recesses[i].positionX) + 0.1});
		}
		setSections[setSections.length -1].width = (((stageWidth / 10) - recesses[recesses.length -1].positionX) / 2) - 0.05;

		// [3] set sections start position must take into account their width
		setSections.forEach(function(section) {
			section.start = section.start + section.width;
		});

		return setSections;

	},
	
	'valueOrDefault': function(position, fallback) {
		return position || fallback;
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

	'topTable': function() {
		return this.ttSize > 0;
	},

	'setGraphicsX': function(side, stageWidth) {
		var doc = Docs.findOne();
		if (doc) {
			if (side === 'SR') {
				return doc.data['Set_Graphics_SRX'] || -((((stageWidth - 12.25) / 2) + 12.3) / 10);
			} else if (side === 'SL') {
				return doc.data['Set_Graphics_SLX'] || ((((stageWidth - 12.25) / 2) + 12.3) / 10);
				//return (((stageWidth - 12.25) / 2) + 12.3) / 10;
			}
		}
	},
	'setGraphicsScale': function(size, setGraphic) {
		var img = Resources.findOne({name: setGraphic});
		if (img) {
			return size + ' ' + (size / img.aspectRatio) + '  0.01';
		} else {
			return '0 0 0';
		}
	}

});


Template.QEII_Fleming_Scene.events({
	
});


Template.QEII_Fleming_Scene.rendered = function() {

	x3dom.reload();

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

