import Phaser from 'phaser';

import loadOauth from '../util/oauth';
import loadingBar from '../util/loadingBar';

class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'menu',
		});
	}

	preload() {
		this.load.image('grass', 'assets/images/grass.png');

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

		loadOauth
			.then((oauth) => {
				this.oauth = oauth;

				this.signInButton = this.add.text(
					this.cameras.main.centerX - 340,
					this.cameras.main.centerY + 180,
					this.oauth.isSignedIn.get() ? 'SIGN OUT' : 'SIGN IN',
					textSettings
				);

				this.signInButton.setInteractive();

				this.signInButton.on('pointerdown', () => {
					if (this.oauth.isSignedIn.get()) {
						this.oauth.signOut();
						this.signInButton.text = 'SIGN IN';
					} else {
						this.oauth.signIn();
						this.signInButton.text = 'SIGN OUT';
					}
				});
			})
			.catch(console.error);
	}
}

export default MenuScene;
