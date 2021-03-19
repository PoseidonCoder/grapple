class menuScene extends Phaser.Scene {
	constructor() {
		super();

		Phaser.Scene.call(this, {
			key: 'menu',
		});
	}

	create() {
		this.playButton = this.add.text(
			this.cameras.main.centerX,
			this.cameras.main.centerY,
			'PLAY'
		);

		this.playButton.setInteractive();

		this.playButton.on('pointerdown', () => {
			this.scene.switch('game');
		});
	}
}
