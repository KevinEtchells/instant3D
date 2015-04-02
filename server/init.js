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
			templates: ['Mountbatten', 'Westminster', 'Fleming', 'Churchill']
		});
	}
	
	// Add Westminster on next deploy - temp only ***********************************************
	var qeii;
	do {
		console.log('Checking templates...');
		qeii = Companies.findOne();
		if (qeii && qeii.templates && qeii.templates.length === 3) {
			console.log('Inserting Westminster Suite into templates');
			Companies.update(qeii._id, {$set: {templates: ['Mountbatten', 'Westminster', 'Fleming', 'Churchill']}});
		}
	} while (!qeii || !qeii.templates)

});
