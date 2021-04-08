import Phaser from 'phaser';

import oauth from '../util/oauth';
import loadingBar from '../util/loadingBar';

class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'menu',
		});
	}

	preload() {
		this.load.image('grass', 'images/grass.png');

		loadingBar(this);
	}

	create() {
		const bg = this.add.tileSprite(
			0,
			0,
			window.innerWidth,
			window.innerHeight,
			'grass'
		);

		bg.setOrigin(0);

		const textSettings = {
			fill: '#fc6b03',
			fontSize: '150px',
			backgroundColor: '#a83232',
		};

		this.playButton = this.add.text(
			this.cameras.main.centerX - 200,
			this.cameras.main.centerY - 170,
			'PLAY',
			textSettings
		);

		this.playButton.setInteractive();

		this.playButton.on('pointerdown', () => {
			this.scene.switch('game');
		});

		this.helpButton = this.add.text(
			this.cameras.main.centerX - 200,
			this.cameras.main.centerY + 5,
			'HELP',
			textSettings
		);

		this.helpButton.setInteractive();

		this.helpButton.on('pointerdown', () => {
			this.scene.switch('help');
		});

		this.signInButton = this.add.text(
			this.cameras.main.centerX - 340,
			this.cameras.main.centerY + 180,
			oauth.isSignedIn.get() ? 'SIGN OUT' : 'SIGN IN',
			textSettings
		);

		this.signInButton.setInteractive();

		this.signInButton.on('pointerdown', () => {
			if (oauth.isSignedIn.get()) {
				oauth.signOut();
				this.signInButton.text = 'SIGN IN';
			} else {
				oauth.signIn();
				this.signInButton.text = 'SIGN OUT';
			}
		});
	}
}

export default MenuScene;
