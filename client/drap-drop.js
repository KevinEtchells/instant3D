// OLD - for Mountbatten Room
var moveableObjects = {};
startStopMoveObject = function(object) {
	if (event.target.localName !== 'canvas') { // click event is fired more than once - this filters correct event
		if (moveableObjects[object]) {
			moveableObjects[object] = false;
		} else {
			moveableObjects[object] = true;
		}
	}
}
moveObject = function(object, event) {
	if (moveableObjects[object]) {
		event.preventDefault();
		var doc = Docs.findOne();
		doc.data[object + 'X'] = event.worldX;
		doc.data[object + 'Y'] = event.worldY;
		doc.data[object + 'Z'] = event.worldZ;
		Docs.update(doc._id, {$set: {data: doc.data}});
	}
	return false;
};



// NEW - for Fleming Room
var previousPositions = {};

dragObject = function(objectId, event) {
	var object = Session.get('selectedObject');
	if (event.button === 1 && object && object.id.toString() === objectId.toString()) {
		if (previousPositions.x) {
			if (object.type === 'screen') {
				var doc = Docs.findOne();
				for (var i = 0; i < doc.data.screens.length; i++) {
					if (doc.data.screens[i].id.toString() === object.id.toString()) {
						//doc.data.screens[i].positionX = snapToNearest( (doc.data.screens[i].positionX || 0) + event.worldX - previousPositions.x, 0.2 );
						doc.data.screens[i].positionX = (doc.data.screens[i].positionX || 0) + event.worldX - previousPositions.x;
						Docs.update(doc._id, {$set: {data: doc.data}});
					}
				}
			}
		} else {
			document.getElementById('navType').setAttribute('type', 'none');
		}
		previousPositions = {x: event.worldX, y: event.worldY, z: event.worldZ}
	} else {
		previousPositions = {}
		document.getElementById('navType').setAttribute('type', 'examine');
	}
};

snapToNearest = function(value, snap) {
	console.log(Math.round(value / snap) * snap);
	return Math.round(value / snap) * snap;
}


