Template.QEII_Westminster_Scene.helpers({
	
});


Template.QEII_Westminster_Scene.events({
	
});


Template.QEII_Westminster_Scene.rendered = function() {

	// only init x3dom if document has loaded (once we have updated iron router we can simplify this)
	var x3domInit = function() {
		if (Docs.findOne()) {
			x3dom.reload();
		} else {
			x3domInit();
		}
	}
	x3domInit();

};
