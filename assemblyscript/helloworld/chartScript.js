window.axios.get('http://localhost:3000/get-stat')
	.then((request) => {
		const data = request.data;
		let sumWasm = 0;
		let sumJs = 0;
		var ctx = document.getElementById("myChart").getContext('2d');

		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: data.map((val) => ""),
				datasets: [
					{
						label: 'WebAssembly',
						data: data.map((val) => {
							sumWasm += val.wasm;
							return ({
								t: data.map((val) => ""),
								y: val.wasm
							})
						})
						,
						backgroundColor: 'transparent',
						borderColor: 'blue',
						borderWidth: 5
					},
					{
						label: 'JavaScript',
						data: data.map((val) => {
							sumJs += val.js;
							return ({
								t: data.map((val) => ""),
								y: val.js
							})
						})
						,
						backgroundColor: 'transparent',
						borderColor: 'yellow',
						borderWidth: 5
					}]
			}
		});
		const avgJS = sumJs / data.length;
		const avgWASM = sumWasm / data.length;
		console.log("avg JS: ", avgJS.toFixed(5));
		console.log("avg wasm: ", avgWASM.toFixed(5));
		console.log((avgJS / avgWASM * 100).toFixed(2) + '% faster/slower');
		// var myChart = new Chart(ctx, {
		// 	type: 'line',
		// 	data: {
		// 		labels: [data.map((val) => val.time)],
		// 		datasets: [
		// 			{
		// 			label: 'WebAssembly',
		// 			data: [data.map((val) => val.wasm)],
		// 			borderColor: 'blue',
		// 				backgroundColor: 'transparent',
		// 				borderWidth: 1
		// 		},
		// 			{
		// 				label: 'JavaScript',
		// 				data: [data.map((val) => val.js)],
		// 				borderColor: 'red',
		//                 backgroundColor: 'transparent',
		// 				borderWidth: 1
		// 			}
		// 		]
		// 	},
		// 	options: {
		// 		scales: {
		// 			yAxes: [{
		// 				ticks: {
		// 					beginAtZero:true
		// 				}
		// 			}]
		// 		}
		// 	}
		// });
	})
