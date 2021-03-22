import Phaser from 'phaser';

class menuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'menu',
		});
	}

	create() {
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
	}
}

export default menuScene;
