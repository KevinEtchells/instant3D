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
	
	'scale': function(size) {
		return size/10;
	},
	'scaleSet': function(size) {
		return size/10 + 0.025;
	},
	
	'valueOrDefault': function(position, fallback) {
		return position || fallback;
	},

	'material': function(property) {
		return '<Material diffuseColor="' + this[property +'Red'] + ' ' + this[property + 'Green'] + ' ' + this[property + 'Blue'] + '"></Material>';
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

	'ttScale': function() {
		return 0.35 * this.ttSize;
	},
	'ttPos': function() {
		return 5 - (0.35 * this.ttSize);
	},
	'modPanelReturnPos': function() {
		return 4.99 - (0.7 * this.ttSize);
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

