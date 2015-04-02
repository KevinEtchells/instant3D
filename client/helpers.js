getHost = function() {
	return window.location.origin;
};

/*
UI.registerHelper('_indexArray', function(array) {
	array.forEach(function(item, index) {
		item.index = index;
	});
	return array;
});
*/

UI.registerHelper('_host', function() {
	return getHost();
});

UI.registerHelper('_option', function(value, text, check) {
	return '<option value="' + value + '"' + (check && value.toString() === check.toString() ? 'selected' : '') + '>' + text + '</option>';
});

UI.registerHelper('_resources', function() {
	return Resources.find();
});

UI.registerHelper('_equal', function(a, b) {
	return a === b;
});

UI.registerHelper('_scale', function(value, amount) {
	return value * amount;
});
