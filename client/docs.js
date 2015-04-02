Template.docs.helpers({

	'rooms': function() {
		var company = Companies.findOne();
		if (company) {
			return company.templates;
		}
	},

	'docs': function() {
		return Docs.find();
	},

	'company': function() {
		return Companies.findOne();
	},

	'selected': function(template) {
		if (this.name === template) {
			return 'selected';
		}
	}

});


Template.docs.events({

	'change input.name': function(event) {
		Docs.update(this._id, {$set: {name: event.target.value}});
	},

	'change select.sharing': function(event) {
		Docs.update(this._id, {$set: {shared: event.target.value}});
	},

	'click [data-action="addDoc"] li': function(event) {

		var room = event.target.innerText,
				company = Companies.findOne(),
				defaults = {};
		
		if (room === 'Mountbatten') {
			defaults = { 
				setGraphicSize: 0.9,
				lectern: true, lecternX: -4.104028,
				ttSize: 4, topTableX: 3.2, modPanelRed: 0, modPanelGreen: 0, modPanelBlue: 0,
				recessesRed: 0, recessesGreen: 0, recessesBlue: 1
			};
		} else if (room === 'Westminster') {
			defaults = {
				stageWidth: 20,
				uplightRed: 0, uplightBlue: 0, uplightGreen: 0, uplightType: 'par'
			};
		} else if (room === 'Fleming') {
			defaults = {
				stageWidth: 36, stageDepth: 0.8, stageHeight: 0.2,
				screens: [
					{id: '1', ratio: '4:3', type: 'Standard', positionX: 0}
				],
				topTables: [
					{id: '1', positionX: -2.4, size: 4, type: 'Top Table', colour: {name: ' S67 Black', rgb: '0 0 0', hash: '#000000'}}
				],
				lecterns: [
					{id: '1', positionX: 2.3, type: 'Felt', logo: 'None', logoSize: 0.23, colour: {name: ' S67 Black', rgb: '0 0 0', hash: '#000000'}}
				],
				uplightRed: 0, uplightGreen: 0, uplightBlue: 1
			};
		}

		Docs.insert({
			name: 'New Document',
			company: company._id,
			template: room,
			created: new Date,
			owner: Meteor.users.findOne().username,
			data: defaults
		});

	},

	'click button.copy': function() {
		Docs.insert({
			name: 'Copy of ' + this.name,
			company: Companies.findOne()._id,
			template: this.template,
			created: new Date,
			owner: Meteor.users.findOne().username,
			data: this.data
		});
	},

	'click button.delete': function() {
		if (confirm('Are you sure you wish to delete this document?')) {
			Docs.remove(this._id);
		}
	}

});
