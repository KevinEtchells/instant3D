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

