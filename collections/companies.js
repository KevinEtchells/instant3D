Companies = new Meteor.Collection('companies');

if (Meteor.isServer) {

  Meteor.publish('companies', function(companyName) {
		return Companies.find({name: companyName});
	});

	Companies.allow({ // only me for all of these
		'update': function(userId, doc) {
			var user = Meteor.users.findOne(userId);
			if (user) {
				return (user.profile.company === 'ALL');
			}
			return false;
		},
		'insert': function(userId, doc) {
      var user = Meteor.users.findOne(userId);
			if (user) {
				return (user.profile.company === 'ALL');
			}
			return false;
		},
		'remove': function(userId, doc) {
      var user = Meteor.users.findOne(userId);
			if (user) {
				return (user.profile.company === 'ALL');
			}
			return false;
		}
	});

}
