import globals from './globals';

function loadingBar(scene) {
	const bg = scene.add.graphics();
	bg.fillStyle(0x6f9c3b);
	bg.fillRect(0, 0, globals.mapWidth, globals.mapHeight);

	const progressBox = scene.add.graphics();
	progressBox.fillStyle(0x384e1c, 0.8);
	progressBox.fillRect(
		globals.mapWidth / 2.7,
		globals.mapHeight / 2.7,
		320,
		50
	);

	const progressBar = scene.add.graphics();

	scene.load.on('progress', (value) => {
		console.log(value);
		progressBar.clear();
		progressBar.fillStyle(0x587c2f, 1);
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
		bg.destroy();
		progressBar.destroy();
		progressBox.destroy();
	});
}

export default loadingBar;
