Template.view.helpers({

	'scene': function() {
		var doc = Docs.findOne(),
				company = Companies.findOne();
		if (doc && company) {
			return Template[company.name + '_' + doc.template + '_Scene'];
		} else {
			return null;
		}
	},
	
	'data': function() {
		var doc = Docs.findOne();
		if (doc) {
			return doc.data;
		}
	}

});


selectObject = function(type, id, event) {
	if (Router.getData().type === 'edit') {
		if (!event.isTrigger) { // filter out 2nd jQuery event fire
			var currentObject = Session.get('selectedObject');
			if (currentObject && currentObject.type === type && currentObject.id === id) {
				Session.set('selectedObject', {});
			} else {
				Session.set('selectedObject', {type: type, id: id});
			}
		}
	}
};
