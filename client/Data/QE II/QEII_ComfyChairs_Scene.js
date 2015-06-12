Template.QEII_ComfyChairs_Scene.helpers({

	'comfyChairs': function(size, position) {

		var chairs = [],
				rotation = size * 0.1,
				zPos = size * -0.2;
				xPos = Number(position);

		for(var i = 0; i < size; i++) {

			if (rotation < 0.001 && rotation > -0.001) {
				zPos = 0.1;
			} else {
				zPos = (rotation > 0 ? rotation : rotation * -1);
				if (zPos > 0.55) {
					zPos = zPos + ((zPos - 0.55) * 1.7);
				}
			}
			//console.log(rotation + ' : ' + zPos);
			xPos = xPos + 0.6 - (zPos * 0.2);
			
			chairs.push({
				positionX: xPos,
				positionZ: zPos,
				rotation: rotation
			});

			rotation = rotation - 0.2;

		}

		return chairs;
	}
	
});

