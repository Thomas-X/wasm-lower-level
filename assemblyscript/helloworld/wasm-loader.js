
// wasm loading / benchmarking

fetch("module.wasm").then(response =>
	response.arrayBuffer()
).then(bytes =>
	WebAssembly.instantiate(bytes, {imports: {}})
).then(results => {

	function simpleFib(n) {
		let i, t, a = 0, b = 1;
		for (i = 0; i < n; i++) {
			t = a + b; a = b; b = t;
		}
		return b;
	}
	function timer(fn, input) {
		const start = window.performance.now();
		console.time("timer");
		fn(input);
		console.timeEnd("timer");
		const end = window.performance.now();
		return end - start;
	}

	window.fib = results.instance.exports.fib;

	console.log('JAVASCRIPT');
	const js = timer(simpleFib, 99999);
	console.log('WEBASSEMBLY');
	const wasm = timer(window.fib, 99999);
	console.log();
	console.log(js / wasm * 100 + '% sneller/langzamer');

	window.axios.post('http://localhost:3000/record-stat', {
		wasm: wasm,
		js: js,
		time: new Date()
	})
		.then(() => {
			setTimeout(() => {
// window.location.reload();
			}, 100);
		});

});