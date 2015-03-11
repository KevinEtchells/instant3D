Template.QEII_Mountbatten_Scene.helpers({

	'Id': function() {
		var doc = Docs.findOne();
		if (doc) {
			return doc._id;
		}
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
		return Docs.findOne().data.topTableX;
	},
	'modPanelReturnPos': function(side) {
		if (side === 'left') {
			return Docs.findOne().data.topTableX + (0.35 * this.ttSize);
		} else if (side === 'right') {
			return Docs.findOne().data.topTableX - (0.35 * this.ttSize);
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


Template.QEII_Mountbatten_Scene.events({
	
});


Template.QEII_Mountbatten_Scene.rendered = function() {
	x3dom.reload();
};

