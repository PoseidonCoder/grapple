import globals from './globals';
import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		super(
			scene,
			Math.random() * globals.mapWidth,
			Math.random() * globals.mapHeight,
			'player'
		);

		this.nameText = scene.add.text(this.x - 40, this.y - 100, scene.name);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setScale(0.5);

		scene.cameras.main.startFollow(this, true);
		this.setCollideWorldBounds(true);

		globals.socket.emit('newPlayer', {
			x: this.x,
			y: this.y,
			name: this.scene.name,
		});
	}

	resetPos() {
		this.setPosition(
			Math.random() * globals.mapWidth,
			Math.random() * globals.mapHeight
		);
		this.resetNameText();
	}

	resetNameText() {
		this.nameText.setPosition(this.x - 40, this.y - 100);
	}
}

export default Player;
