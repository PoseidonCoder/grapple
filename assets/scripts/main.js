class gameScene extends Phaser.Scene {
	constructor() {
		super();
		this.speed = 3;
	}

	preload() {
		this.load.image('player', 'assets/images/player.png');
		this.load.image('bullet', 'assets/images/bullet.png');
	}

	create() {
		this.player = this.add.sprite(100, 100, 'player');
		this.player.setScale(3);

		this.bulletGroup = new bulletGroup(this);

		this.upKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.UP
		);

		this.wKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.W
		);

		this.downKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.DOWN
		);

		this.sKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.S
		);

		this.leftKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.LEFT
		);

		this.aKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.A
		);

		this.rightKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.RIGHT
		);

		this.dKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.D
		);

		this.input.on('pointerdown', (event) => {
			this.bulletGroup.fire(this.player.x, this.player.y - 20);
		});

		this.input.on('pointermove', (event) => {
			const angle =
				Phaser.Math.RAD_TO_DEG * // converts the radians to degress
				Phaser.Math.Angle.Between(
					// calculates the angle in radians
					this.player.x,
					this.player.y,
					event.x,
					event.y
				);
			this.player.setAngle(angle);
		});
	}

	update() {
		if (this.upKey.isDown || this.wKey.isDown) {
			this.player.y -= this.speed;
		}

		if (this.downKey.isDown || this.sKey.isDown) {
			this.player.y += this.speed;
		}

		if (this.leftKey.isDown || this.aKey.isDown) {
			this.player.x -= this.speed;
		}

		if (this.rightKey.isDown || this.dKey.isDown) {
			this.player.x += this.speed;
		}
	}
}

const game = new Phaser.Game({
	width: 500,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		},
	},
	scene: [gameScene],
});
