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
		
		console.log('Creating data for first time use');
		
		Companies.insert({
			name: 'QEII',
			templates: {
				'Mountbatten': { 
					defaults: {
						setGraphicSize: 0.9,
						lectern: true, lecternX: -4.104028,
						ttSize: 4, modPanelRed: 0, modPanelGreen: 0, modPanelBlue: 0,
						recessesRed: 0, recessesGreen: 0, recessesBlue: 1
					}
				},
				'Fleming': {
					defaults: {
						stageWidth: 36,
						screens: [
							{name: 'Screen 1', id: '1', ratio: '4:3', type: 'Standard'}
						],
						setGraphicSize: 0.9,
						lectern: true, lecternX: -4.104028,
						ttSize: 4, topTableX: 4.5, modPanelRed: 0, modPanelGreen: 0, modPanelBlue: 0,
						uplightRed: 0, uplightGreen: 0, uplightBlue: 1
					}
				},
				'Churchill': {
					defaults: {
						setGraphicSize: 0.9,
						lectern: true, lecternX: -4.104028,
						ttSize: 4, topTableX: 4.5, modPanelRed: 0, modPanelGreen: 0, modPanelBlue: 0,
						uplightRed: 0, uplightGreen: 0, uplightBlue: 1
					}
				}
			}
		});

	}

});
