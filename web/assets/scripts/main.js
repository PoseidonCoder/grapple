console.log(`We are ${PRODUCTION ? '' : 'not'} in production`);

import oauth from './util/oauth';
import globals from './util/globals';
import Phaser from 'phaser';

import GameScene from './scenes/game';

let menuScreen, playButton, loginButton;

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
	loginButton = document.getElementById('loginButton');

	if (oauth.isSignedIn.get()) {
		loginButton.innerText = 'sign out';
	}

	loginButton.onclick = () => {
		if (oauth.isSignedIn.get()) {
			oauth.signOut();
			loginButton.innerText = 'SIGN IN';
		} else {
			oauth.signIn();
			loginButton.innerText = 'SIGN OUT';
		}
	};

	playButton.onclick = startGame;
}

function startGame() {
	menuScreen.style.display = 'none';

	loginButton.onclick = new Phaser.Game({
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
