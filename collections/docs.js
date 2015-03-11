Docs = new Meteor.Collection('docs');

if (Meteor.isServer) {

  Meteor.publish('docs', function(companyName, docId) { 
		var user = Meteor.users.findOne(this.userId);
		if (user) {
			if (user.profile.company === companyName || user.profile.company === 'ALL') {
				if (docId) {
					return Docs.find(docId); // TO DO: if doc is shared publish this
				} else {
					var company = Companies.findOne({name: companyName});
					if (company) {
						return Docs.find({company: company._id});
					}
				}
			}
		}
		return null; // TO DO: error generated unless cursor is returned
	});

	Docs.allow({
		'update': function(userId, doc) { // TO DO: allow access if shared
      var user = Meteor.users.findOne(userId);
			if (user) {
				if (user.profile.company === 'ALL') {
					return true;
				} else {
					var company = Companies.findOne({name: user.profile.company});
					if (company) {
						if (company._id === doc.company || user.profile.company === 'ALL') {
							return true;
						}
					}
				}
			}
			return false;
		},
		'insert': function(userId, doc) { 
			var user = Meteor.users.findOne(userId);
			if (user) {
				if (user.profile.company === 'ALL') {
					return true;
				} else {
					var company = Companies.findOne({name: user.profile.company});
					if (company) {
						if (company._id === doc.company || user.profile.company === 'ALL') {
							return true;
						}
					}
				}
			}
			return false;
		},
		'remove': function(userId, doc) {
			var user = Meteor.users.findOne(userId);
			if (user) {
				if (user.profile.company === 'ALL') {
					return true;
				} else {
					var company = Companies.findOne({name: user.profile.company});
					if (company) {
						if (company._id === doc.company || user.profile.company === 'ALL') {
							return true;
						}
					}
				}
			}
			return false;
		},
	});

}
