Router.map(function () {

	// TO DO: if user not logged in, and document not shared, re-direct to home page

  this.route('view', {
    path: '/:company/:doc/view',
    waitOn: function() {
      return [
        Meteor.subscribe('docs', this.params.company, this.params.doc),
        Meteor.subscribe('companies', this.params.company)
      ];
    },
    data: function() {
			return {
				company: this.params.company
			};
		}
  });
  
  this.route('control', {
    path: '/:company/:doc/control',
    waitOn: function() {
      return [
        Meteor.subscribe('docs', this.params.company, this.params.doc),
        Meteor.subscribe('companies', this.params.company)
      ];
    },
    data: function() {
      return {
        company: this.params.company
      };
    }
  });
  
  this.route('edit', {
    path: '/:company/:doc/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('docs', this.params.company, this.params.doc),
        Meteor.subscribe('companies', this.params.company),
        Meteor.subscribe('resources', this.params.doc)
      ];
    },
    data: function() {
      return {
        company: this.params.company
      };
    }
  });
  
  this.route('resource', {
		path: 'resource/:doc/:image',
    where: 'server',
    action: function() {
      var resource = Resources.findOne({doc: this.params.doc, name: this.params.image});
      if (resource) {
				var resourceObj = resource.file.split(',');
				var decodedImage = new Buffer(resourceObj[1], 'base64');
				//this.response.writeHeader(200, {'Content-Type': 'image/png'}); // TO DO: 'image/jpg', 'image/png'
				this.response.end(decodedImage);
			} else {
				this.response.end(); // TO DO: set header to appropriate status code
			}
    }
	});
  
  this.route('docs', {
		path: '/:company',
		waitOn: function() {
      return [
        Meteor.subscribe('docs', this.params.company),
        Meteor.subscribe('companies', this.params.company)
      ];
    },
    action: function() {
			this.render();
			/*
			if (Meteor.user()) {
				//alert(Meteor.user().profile.company);
				this.render();
			} else {
				//alert('Please log in');
				//this.redirect('/');
			}
			*/
		}
	});
  
  this.route('home', {
		path: '/*'
	});

});
