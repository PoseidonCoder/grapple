class bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);
	}
}

class bulletGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 30,
			key: 'bullet',
			setScale: {
				x: 0.3,
				y: 0.3,
			},
			active: false,
			visible: false,
			classType: bullet,
		});
	}

	fire(x, y) {
		const bullet = this.getFirstDead(false);
		if (bullet) bullet.fire(x, y);
	}
}

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
		this.player = this.physics.add.sprite(100, 100, 'player');
		this.player.setScale(3);

		this.bulletGroup = new bulletGroup(this);

		this.upKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.UP
		);
		this.downKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.DOWN
		);
		this.leftKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.LEFT
		);
		this.rightKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.RIGHT
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
