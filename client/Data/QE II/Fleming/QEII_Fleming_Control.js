Template.QEII_Fleming_Control.helpers({

});


Template.QEII_Fleming_Control.events({

	'dblclick [data-reset="screenPosition"]': function() {
		var doc = Docs.findOne(),
				id = Session.get('selectedObject').id;
		for (var i = 0; i < doc.data.screens.length; i++) {
			if (doc.data.screens[i].id.toString() === id.toString()) {
				doc.data.screens[i].positionX = 0;
			}
		}
		Docs.update(doc._id, {$set: {data: doc.data}});
		previousPositions = {} // to prevent position jumping if drag-drop
		event.target.value = 0; // need to force refresh
	},

	'click [data-action="add"]': function(event) {

		var defaults = {id: Date.now()},
				doc = Docs.findOne(),				
				type = event.target.getAttribute('data-collection');

		if (type === 'screens') {
			defaults.ratio = '4:3';
			defaults.type = 'Standard';
			defaults.positionX = 0;
		} else if (type === 'setGraphics') {
			defaults.positionX = -2;
			defaults.positionY = 1.6;
			defaults.size = 0.5;
		} else if (type === 'recesses') {
			defaults.positionX = -2;
		} else if (type === 'lecterns') {
			defaults.positionX = 2.3;
			defaults.type = 'Felt';
			defaults.logo = 'None';
			defaults.logoSize = 0.23;
			defaults.colour = {hash: '#000000', rgb: '0 0 0', name: 'S67 Black'};
		} else if (type === 'topTables') {
			defaults.positionX = -2.4;
			defaults.size = 4;
			defaults.type = 'Top Table';
			defaults.colour = {hash: '#000000', rgb: '0 0 0', name: 'S67 Black'};
		}
		
		if (!doc.data[type]) {
			doc.data[type] = [];
		}

		doc.data[type].push(defaults);
		Docs.update(doc._id, {$set: {data: doc.data}});

	}

});
