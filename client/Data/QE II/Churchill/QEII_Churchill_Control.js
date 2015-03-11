Template.QEII_Churchill_Control.helpers({

	'setGraphicsSize': function(size, setGraphic) {
		var img = Resources.findOne({name: setGraphic});
		if (img) {
			return Math.round(size * 3048) + 'mm x ' + Math.round((size / img.aspectRatio) * 3048) + 'mm';
		} else {
			return '';
		}
	}

});


Template.QEII_Churchill_Control.events({

	'click div.colourBoxSmall': function(event) {
		document.querySelectorAll('div.feltSwatch')[0].style.left = 0;
	},
	
	'click div.colourBoxMedium': function(event) {

		var currentDoc = Docs.findOne();
		currentDoc.data.modPanelColour = event.target.style.backgroundColor
		Docs.update(currentDoc._id, {$set: {data: currentDoc.data}});
		
		document.querySelectorAll('div.feltSwatch')[0].style.left = '-250px';
	},
	
	

});
