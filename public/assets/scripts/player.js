class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		super(scene, Math.random() * 500, Math.random() * 500, 'player');

		this.nameText = scene.add.text(this.x - 30, this.y - 100, scene.name);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setScale(0.5);

		scene.cameras.main.startFollow(this, true);
		this.setCollideWorldBounds(true);

		socket.emit('newPlayer', {
			x: this.x,
			y: this.y,
			name: this.scene.name,
		});
	}

	resetPos() {
		this.setPosition(Math.random() * 500, Math.random() * 500);
		this.resetNameText();
	}

	resetNameText() {
		this.nameText.setPosition(this.x - 30, this.y - 100);
	}
}
