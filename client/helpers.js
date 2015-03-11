/*
UI.registerHelper('_indexArray', function(array) {
	array.forEach(function(item, index) {
		item.index = index;
	});
	return array;
});
*/

UI.registerHelper('_host', function() {
	return window.location.origin;
});

UI.registerHelper('_option', function(value, text, check) {
	return '<option value="' + value + '"' + (value === check ? 'selected' : '') + '>' + text + '</option>';
});

UI.registerHelper('_resources', function() {
	return Resources.find();
});
