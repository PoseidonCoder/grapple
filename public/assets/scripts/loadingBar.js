function loadingBar(scene) {
	const progressBar = this.add.graphics();
	const progressBox = this.add.graphics();
	progressBox.fillStyle(0x222222, 0.8);
	progressBox.fillRect(
		globals.mapWidth / 2.7,
		globals.mapHeight / 2.7,
		320,
		50
	);

	scene.load.on('progress', (value) => {
		console.log(value);
		progressBar.clear();
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(
			globals.mapWidth / 2.7 + 10,
			globals.mapHeight / 2.7 + 10,
			300 * value,
			30
		);
	});

	scene.load.on('fileprogress', (file) => {
		console.log(file.src);
	});

	scene.load.on('complete', () => {
		console.log('complete');
		progressBar.destroy();
		progressBox.destroy();
	});
}
