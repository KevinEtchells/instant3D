Template.QEII_Churchill_Scene.helpers({

	'Id': function() {
		var doc = Docs.findOne();
		if (doc) {
			return doc._id;
		}
	},
	
	'scale': function(size) {
		return size/10;
	},
	'scaleSet': function(size) {
		return size/10 + 0.025;
	},
	
	'material': function(property) {
		return '<Material diffuseColor="' + this[property +'Red'] + ' ' + this[property + 'Green'] + ' ' + this[property + 'Blue'] + '"></Material>';
	},

	'topTable': function() {
		return this.ttSize > 0;
	},

	'ttScale': function() {
		return 0.35 * this.ttSize;
	},
	'ttPos': function() {
		return 5 - (0.35 * this.ttSize);
	},
	'modPanelReturnPos': function() {
		return 4.99 - (0.7 * this.ttSize);
	},


	'setGraphicsX': function(stageWidth) {
		return (((stageWidth - 12.25) / 2) + 12.3) / 10;
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


Template.QEII_Churchill_Scene.events({

});
	

Template.QEII_Churchill_Scene.rendered = function() {
	x3dom.reload();
};

