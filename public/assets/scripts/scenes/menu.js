class menuScene extends Phaser.Scene {
	constructor() {
		super();

		Phaser.Scene.call(this, {
			key: 'menu',
		});
	}

	create() {
		const textSettings = {
			fill: '#fc6b03',
			fontSize: '150px',
		};

		this.playButton = this.add.text(
			this.cameras.main.centerX - 200,
			this.cameras.main.centerY - 125,
			'PLAY',
			textSettings
		);

		this.playButton.setInteractive();

		this.playButton.on('pointerdown', () => {
			this.scene.switch('game');
		});

		this.helpButton = this.add.text(
			this.cameras.main.centerX - 200,
			this.cameras.main.centerY + 25,
			'HELP',
			textSettings
		);

		this.helpButton.setInteractive();

		this.helpButton.on('pointerdown', () => {
			this.scene.switch('help');
		});
	}
}
