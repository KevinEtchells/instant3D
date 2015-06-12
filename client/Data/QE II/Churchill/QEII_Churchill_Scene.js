Template.QEII_Churchill_Scene.helpers({

	'angle': function(xPos, reverse) {

		if (reverse && typeof(reverse) === 'boolean') {
			xPos = -xPos;
		}

		if (xPos > 1.5) {
			return '0 1 0 -0.79';
		} else if (xPos < -1.5) {
			return '0 1 0 0.79';
		} else {
			return '0 0 0 0';
		}

	},
	
	'zPos45deg': function(xPos) {

		// Make xPos positive
		if (xPos < 0) {
			xPos = 0 - xPos;
		}
		
		if (xPos < 1.5) { // central set
			return - 2.29;
		} else {
			return xPos - 3.97;
		}

	},
	/*
	'chairRotation': function(index) {
		return '0';
	}
	*/
});


Template.QEII_Churchill_Scene.events({

});
	

Template.QEII_Churchill_Scene.rendered = function() {

	// only init x3dom if document has loaded (once we have updated iron router we can simplify this)
	var x3domInit = function() {
		if (Docs.findOne()) {
			x3dom.reload();
		} else {
			x3domInit();
		}
	}
	x3domInit();

};

