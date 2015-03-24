Meteor.startup(function () {
	
	// default users
	if (!Meteor.users.find().fetch().length) {

		Accounts.createUser({
			username: 'Kevin Etchells',
			password: 'JCB',
			email: 'kevetchells@hotmail.com',
			profile: {
				company: 'QEII'
			}
		});
		
		Accounts.createUser({
			username: 'Steven Mann',
			password: 'boombeach',
			email: 'steven.mann@qeiicentre.london',
			profile: {
				company: 'QEII'
			}
		});

	}

	// companies
	if (!Companies.find().fetch().length) {
		Companies.insert({
			name: 'QEII',
			templates: ['Mountbatten', 'Fleming', 'Churchill']
		});
	}

});
