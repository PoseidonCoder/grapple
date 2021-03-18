class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		super(scene, Math.random() * 500, Math.random() * 500, 'player');

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setScale(0.5);

		scene.cameras.main.startFollow(this, true);
		this.setCollideWorldBounds(true);

		socket.emit('newPlayer', {
			x: this.x,
			y: this.y,
		});
	}

	resetPos() {
        this.x = Math.random() * 500;
        this.y = Math.random() * 500; 
	}
}
