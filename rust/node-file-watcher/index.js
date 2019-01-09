var watch = require('node-watch');

console.log(process.argv);

watch(process.argv[2], { recursive: true }, function(evt, name) {
	console.log('%s changed.', name);
});
