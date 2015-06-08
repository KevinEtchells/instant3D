Template.QEII_Fleming_Scene.helpers({

	'stageDepthOffset': function(value1, value2) {
		var doc = Docs.findOne();
		if (doc && doc.data.stageDepth === '1.2') {
			return value2;
		}
		return value1;
	},

	'setSections': function() { // this works out the gaps for the recesses

		var doc = Docs.findOne(),
				recesses = doc.data.recesses,
				setSections = [],
				stageWidth = doc.data.stageWidth;

		// [1] if any recesses are mirrored, add these to the array
		if (recesses && recesses.length) {
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
		if (recesses && recesses.length) {
			recesses.sort(function(a, b) {
				return a.positionX > b.positionX;
			});
		}

		// [3] create set sections data
		setSections.push({start: stageWidth / -10});
		if (recesses && recesses.length) {
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
		
		// [5] if curved ends, leave space for these
		if (doc.data.curvedEndFlats) {
			var lastIndex = setSections.length - 1;
			setSections[0].start = setSections[0].start + 0.2;
			setSections[0].width = setSections[0].width - 0.2;
			setSections[lastIndex].start = setSections[lastIndex].start - 0.2;
			setSections[lastIndex].width = setSections[lastIndex].width - 0.2;
		}
		

		return setSections;

	},
	
	'curvedFlatPositionX': function(stageWidth, offset) {
		return (stageWidth / 10) + offset;
		
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
