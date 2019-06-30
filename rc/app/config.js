define([], function () {
	return {
		backgroundColor: '#f4f4f4',
		wheelsConfig: {
			baseRadius: 100,
			stepRadius: 100,
			amount: 3,
			colors: ['#F39C6B', '#FF3864', '#261447'],
			bases: [2, 3, 4],
			beatTypes: ['type1', 'type2', 'type3'],
		},
		handConfig: {
			defaultRpm: 30,
			color: '#ff5ee6',
			baseWidth: 7,
		},
		beatsConfig: {
			nullBeat: {
					radius: 20,
					color: '#eef0e8',
					strokeColor: '#000000',
					strokeWeight: 0
				},
			maxShockWaveRadiusMultiplyer: 1.5,
			types: {
				'type1': {
					radius: 25,
					swellRadius: 25,
					src: './assets/bass_sample.mp3',
					color: '#32e5b2',
				},
				'type2': {
					radius: 28,
					swellRadius: 30,
					src: './assets/clap_sample.mp3',
					color: '#db0808',
				},
				'type3': {
					name: 'type3',
					radius: 31,
					swellRadius: 50,
					src: './assets/hh_sample.mp3',
					color: '#4f4ad6',
				}
			}
		}
	}
});