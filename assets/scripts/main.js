const gameScene = new Phaser.Scene('game');
const game = new Phaser.Game({
	width: 500,
	height: 500,
	scene: [gameScene],
});

gameScene.init = function () {
	this.speed = 3;
};

gameScene.preload = function () {
	this.load.image('player', 'assets/images/player.png');
};

gameScene.create = function () {
	this.player = this.add.sprite(100, 100, 'player');
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
