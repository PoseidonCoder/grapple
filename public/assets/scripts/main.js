import globals from './util/globals';
import Phaser from 'phaser';

import firebase from 'firebase/app';
require('firebase/analytics');

import gameScene from './scenes/game';
import helpScene from './scenes/help';
import menuScene from './scenes/menu';

firebase.initializeApp({
	apiKey: 'AIzaSyDXU6Lw0B-Ma_LagtQ4OF-lmmwaAeZGBB8',
	authDomain: 'grapple-ecd1c.firebaseapp.com',
	projectId: 'grapple-ecd1c',
	storageBucket: 'grapple-ecd1c.appspot.com',
	messagingSenderId: '874102344684',
	appId: '1:874102344684:web:5012c4dedb571774974ec9',
	measurementId: 'G-7DFTRDPTLF',
	databaseURL: 'https://grapple-ecd1c-default-rtdb.firebaseio.com/',
});

firebase.analytics();

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
