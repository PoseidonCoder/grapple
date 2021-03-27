import Phaser from 'phaser';
import loadingBar from '../util/loadingBar';

class menuScene extends Phaser.Scene {
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

		this.signInButton = this.add.text(
			this.cameras.main.centerX - 340,
			this.cameras.main.centerY + 180,
			'SIGN IN',
			textSettings
		);

		this.signInButton.setInteractive();

		this.signInButton.on('pointerdown', () => {
			window.location.replace('/api/create');
		});
	}
}

export default menuScene;
