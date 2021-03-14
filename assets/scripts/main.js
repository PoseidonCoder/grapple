const gameScene = new Phaser.Scene('game');
const game = new Phaser.Game({
	width: 500,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
	scene: [gameScene],
});

gameScene.init = function () {
	this.speed = 3;
};

gameScene.preload = function () {
	this.load.image('player', 'assets/images/player.png');
};

gameScene.create = function () {
	this.player = this.physics.add.sprite(100, 100, 'player');
	this.player.setScale(3);

	this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	this.downKey = this.input.keyboard.addKey(
		Phaser.Input.Keyboard.KeyCodes.DOWN
	);
	this.leftKey = this.input.keyboard.addKey(
		Phaser.Input.Keyboard.KeyCodes.LEFT
	);
	this.rightKey = this.input.keyboard.addKey(
		Phaser.Input.Keyboard.KeyCodes.RIGHT
	);

	this.input.on('pointermove', (event) => {
		const angle =
			Phaser.Math.RAD_TO_DEG * // converts the radians to degress
			Phaser.Math.Angle.Between( // calculates the angle in radians
				this.player.x,
				this.player.y,
				event.x,
				event.y
			);
		this.player.setAngle(angle);
	});
};

gameScene.update = function () {
	if (this.upKey.isDown) {
		this.player.y -= this.speed;
	}

	if (this.downKey.isDown) {
		this.player.y += this.speed;
	}

	if (this.leftKey.isDown) {
		this.player.x -= this.speed;
	}

	if (this.rightKey.isDown) {
		this.player.x += this.speed;
	}
};
