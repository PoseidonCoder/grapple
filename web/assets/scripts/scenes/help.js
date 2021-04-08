import Phaser from 'phaser';

class HelpScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'help',
		});
	}

	preload() {
		this.load.image('grass', 'images/grass.png');
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

export default HelpScene;
