Template.QEII_Westminster_Control.events({

	'click [data-action="add"]': function(event) {

		var defaults = {id: Date.now()},
				doc = Docs.findOne(),				
				type = event.target.getAttribute('data-collection');

		if (type === 'screens') {
			defaults.ratio = '4:3';
		} else if (type === 'setGraphics') {
			defaults.positionX = -1.46;
			defaults.positionY = 1.18;
			defaults.size = 0.3;
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
		} else if (type === 'customObjects') {
			defaults.size = 1;
			defaults.positionX = 0;
			defaults.positionY = 1.18;
			defaults.positionZ = 1;
			defaults.rotationX = 0;
			defaults.rotationY = 0;
			defaults.rotationZ = 0;
			defaults.content = '<shape><box></box></shape>';
		}
		
		if (!doc.data[type]) {
			doc.data[type] = [];
		}

		doc.data[type].push(defaults);
		Docs.update(doc._id, {$set: {data: doc.data}});

	}

});
