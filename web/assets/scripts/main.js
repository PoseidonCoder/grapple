console.log(`We are ${PRODUCTION ? '' : 'not'} in production`);

import globals from './util/globals';
import Phaser from 'phaser';

import GameScene from './scenes/game';

let menuScreen, playButton;

if (document.readyState != 'loading') {
	getElements();
} else {
	window.addEventListener('DOMContentLoaded', () => {
		getElements();
	});
}

function getElements() {
	menuScreen = document.getElementById('menuScreen');
	playButton = document.getElementById('playButton');

	playButton.onclick = startGame;
}

function startGame() {
	menuScreen.style.display = 'none';

	new Phaser.Game({
		type: Phaser.CANVAS,
		width:
			window.innerWidth > globals.mapWidth
				? globals.mapWidth
				: window.innerWidth,
		height:
			window.innerHeight > globals.mapHeight
				? globals.mapHeight
				: window.innerHeight,
		physics: {
			default: 'arcade',
			arcade: {
				debug: false,
			},
		},
		scene: [GameScene],
	});
}
