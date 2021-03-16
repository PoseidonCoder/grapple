class gameScene extends Phaser.Scene {
	constructor() {
		super();

		this.speed = 3;
		this.sprintAcceleration = 2;
		this.socket = io();
	}

	preload() {
		this.load.image('player', 'assets/images/player.png');
		this.load.image('bullet', 'assets/images/bullet.png');
	}

	create() {
		this.start = this.getTime();

		this.players = this.physics.add.group();
		this.socket.on('newPlayer', (player) => {
			const newPlayer = this.add.sprite(
				player.pos.x,
				player.pos.y,
				'player'
			);
			newPlayer.setScale(3);
			newPlayer.id = player.id;

			this.players.add(newPlayer);
		});

		this.socket.on('players', (players) => {
			Object.keys(players).forEach((id) => {
				if (id != this.socket.id) {
					this.players.getChildren().forEach((player) => {
						if (player.id == id) {
							const playerPos = players[id];
							player.setPosition(playerPos.x, playerPos.y);
							player.setAngle(playerPos.angle);
						}
					});
				}
			});
		});

		this.socket.on('playerLeft', (id) => {
			this.players.getChildren().forEach((player) => {
				if (player.id == id) {
					player.destroy();
				}
			});
		});

		this.physics.world.setBounds(0, 0, 500, 500);
		this.cameras.main.setBounds(0, 0, 500, 500);

		this.player = this.physics.add.sprite(100, 100, 'player');
		this.player.setScale(3);
		this.player.setCollideWorldBounds(true);
		this.cameras.main.startFollow(this.player, true);

		this.socket.emit('newPlayer', {
			x: this.player.x,
			y: this.player.y,
		});

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

		this.input.keyboard.on('keydown-SHIFT', (event) => {
			this.speed += this.sprintAcceleration;
		});

		this.input.keyboard.on('keyup-SHIFT', (event) => {
			this.speed -= this.sprintAcceleration;
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
			this.cameras.main.scrollY -= this.speed;
		}

		if (this.downKey.isDown || this.sKey.isDown) {
			this.player.y += this.speed;
			this.cameras.main.scrollY += this.speed;
		}

		if (this.leftKey.isDown || this.aKey.isDown) {
			this.player.x -= this.speed;
			this.cameras.main.scrollX -= this.speed;
		}

		if (this.rightKey.isDown || this.dKey.isDown) {
			this.player.x += this.speed;
			this.cameras.main.scrollX += this.speed;
		}

		if (this.input.activePointer.isDown && this.showDelta() > 100) {
			this.bulletGroup.fire(this.player.x, this.player.y - 20);
			this.start = this.getTime();
		}

		this.socket.emit('player', {
			x: this.player.x,
			y: this.player.y,
			angle: this.player.angle,
		});
	}

	getTime() {
		return new Date().getTime();
	}

	showDelta() {
		return this.getTime() - this.start;
	}
}
