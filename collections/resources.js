Resources = new Meteor.Collection('resources');

if (Meteor.isServer) {

  Meteor.publish('resources', function(doc) {
		// TO DO: company user, or shared doc, only
		return Resources.find({doc: doc}, {fields: {name: 1, aspectRatio: 1}});
	});

	Resources.allow({ // TO DO: what permissions do I need here?
		'insert': function(userId, doc) {
			return true;
		},
		'remove': function(userId, doc) {
			return true;
		}
	});

}
