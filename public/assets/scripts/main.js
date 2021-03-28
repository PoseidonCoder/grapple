import globals from './util/globals';
import Phaser from 'phaser';

import gameScene from './scenes/game';
import helpScene from './scenes/help';
import menuScene from './scenes/menu';

new Phaser.Game({
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
	scene: [menuScene, helpScene, gameScene],
});
