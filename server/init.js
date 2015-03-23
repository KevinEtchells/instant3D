Meteor.startup(function () {
	
	// default users
	if (!Meteor.users.find().fetch().length) {

		Accounts.createUser({
			username: 'KevinEtchells',
			password: 'JCB',
			email: 'kevetchells@hotmail.com',
			profile: {
				company: 'QEII'
			}
		});

	}

	// test companies
	if (!Companies.find().fetch().length) {
		Companies.insert({
			name: 'QEII',
			templates: ['Mountbatten', 'Fleming', 'Churchill']
		});
	}

});
