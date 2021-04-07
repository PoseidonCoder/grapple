console.log(`We are ${PRODUCTION ? '' : 'not'} in production`);

import globals from './util/globals';
import Phaser from 'phaser';

import GameScene from './scenes/game';
import HelpScene from './scenes/help';
import MenuScene from './scenes/menu';

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
	scene: [MenuScene, HelpScene, GameScene],
});
