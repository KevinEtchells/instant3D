Template.QEII_Westminster_Control.helpers({

});


Template.QEII_Westminster_Control.events({

	'click [data-action="add"]': function(event) {

		var defaults = {id: Date.now()},
				doc = Docs.findOne(),				
				type = event.target.getAttribute('data-collection');

		if (type === 'screens') {
			defaults.ratio = '4:3';
		} else if (type === 'setGraphics') {
			defaults.positionX = -2;
			defaults.positionY = 1.6;
			defaults.size = 0.5;
		} else if (type === 'lecterns') {
			defaults.positionX = 2.3;
			defaults.type = 'Felt';
			defaults.logo = 'None';
			defaults.logoSize = 0.23;
			defaults.colour = {hash: '#000000', rgb: '0 0 0'};
		} else if (type === 'topTables') {
			defaults.positionX = -2.4;
			defaults.size = 4;
			defaults.type = 'Top Table';
			defaults.colour = {hash: '#000000', rgb: '0 0 0'};
		}
		
		if (!doc.data[type]) {
			doc.data[type] = [];
		}

		doc.data[type].push(defaults);
		Docs.update(doc._id, {$set: {data: doc.data}});

	}

});
