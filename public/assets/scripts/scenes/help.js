import Phaser from 'phaser';

class helpScene extends Phaser.Scene {
	constructor() {
		super();

		Phaser.Scene.call(this, {
			key: 'help',
		});
	}

	create() {
		this.backButton = this.add.text(0, 0, 'BACK', {
			fill: '#fc6b03',
		});
		this.backButton.setInteractive();

		this.backButton.on('pointerdown', () => {
			this.scene.switch('menu');
		});

		this.add.text(
			this.cameras.main.centerX - 300,
			this.cameras.main.centerY - 100,
			`
			How to play:
                Use wasd keys to move
                Hold down the cursor to shoot
                Shoot the other players in order to earn points
			Tip:
				Hold shift to sprint
            `
		);
	}
}

export default helpScene;
