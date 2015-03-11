Template.docs.helpers({

	'rooms': function() {
		var rooms = [],
			company = Companies.findOne();
		
		if (company) {
			for (var room in company.templates) {
				rooms.push(room);
			}
			
			return rooms;
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

	'click [data-action="addDoc"] li': function() {
		var room = this.toString(),
			company = Companies.findOne();
			
		Docs.insert({
			name: 'New Document',
			company: company._id,
			template: room,
			created: new Date,
			shared: 'private',
			data: company.templates[room].defaults
		});
	},

	'click button.copy': function() {
		Docs.insert({
			name: 'Copy of ' + this.name,
			company: Companies.findOne()._id,
			template: this.template,
			created: new Date,
			shared: this.shared,
			data: this.data
		});
	},

	'click button.delete': function() {
		if (confirm('Are you sure you wish to delete this document?')) {
			Docs.remove(this._id);
		}
	}

});
