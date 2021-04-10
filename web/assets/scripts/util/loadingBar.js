import globals from './globals';

function loadingBar(scene) {
	const bg = scene.add.graphics();
	bg.fillStyle(0x6f9c3b);
	bg.fillRect(0, 0, globals.mapWidth, globals.mapHeight);

	const loadingText = scene.make.text({
		x: globals.mapWidth / 2,
		y: globals.mapHeight / 2 - 15,
		text: 'Loading...',
	});
	loadingText.setOrigin(0.5, 0.5);

	const progressBox = scene.add.graphics();
	progressBox.fillStyle(0x384e1c, 0.8);
	progressBox.fillRect(
		globals.mapWidth / 2 - 165,
		globals.mapHeight / 2,
		320,
		50
	);

	const progressBar = scene.add.graphics();

	const percentText = scene.make.text({
		x: globals.mapWidth / 2 - 20,
		y: globals.mapHeight / 2 + 20,
	});
	percentText.setOrigin(0.5, 0.5);

	scene.load.on('progress', (value) => {
		// console.log(value);
		progressBar.clear();
		progressBar.fillStyle(0x587c2f);
		progressBar.fillRect(
			globals.mapWidth / 2 + 10 - 165,
			globals.mapHeight / 2 + 10,
			300 * value,
			30
		);

		percentText.setText(Math.round(value * 100) + '%');
		// console.log(value * 100 + '%');
	});

	scene.load.on('fileprogress', (file) => {
		// console.log(file.src);
	});

	scene.load.on('complete', () => {
		// console.log('complete');
		bg.destroy();
		progressBar.destroy();
		progressBox.destroy();
		percentText.destroy();
	});
}

export default loadingBar;
