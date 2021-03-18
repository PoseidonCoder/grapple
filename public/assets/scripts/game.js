class gameScene extends Phaser.Scene {
	constructor() {
		super();
	}

	init() {
		this.speed = 3;
		this.score = 0;
		this.sprintAcceleration = 2;
	}

	preload() {
		this.load.image('player', 'assets/images/player.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.audio('pew', 'assets/sounds/pew.ogg');
	}

	create() {
		this.start = this.getTime();

		socket.emit("ready");

		this.scoreText = this.add.text(10, 10, 'Score: 0');
		socket.on('landedShot', () => {
			this.score++;
			this.scoreText.text = 'Score: ' + this.score;
		});

		this.players = this.physics.add.group();
		socket.on('newPlayer', (player) => {
			const newPlayer = this.add.sprite(
				player.pos.x,
				player.pos.y,
				'player'
			);
			newPlayer.setScale(3);
			newPlayer.id = player.id;

			this.players.add(newPlayer);
		});

		socket.on('players', (players) => {
			Object.keys(players).forEach((id) => {
				if (id != socket.id) {
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

		socket.on('playerLeft', (id) => {
			this.players.getChildren().forEach((player) => {
				if (player.id == id) {
					player.destroy();
				}
			});
		});

		this.physics.world.setBounds(0, 0, 500, 500);
		this.cameras.main.setBounds(0, 0, 500, 500);

		this.player = new Player(this);

		this.myBullets = new bulletGroup(this);
		this.theirBullets = this.physics.add.group();
		this.physics.add.collider(this.theirBullets, this.player, (bullet) => {
			this.player.resetPos();
			this.score--;
			this.scoreText.text = 'Score: ' + this.score;

			socket.emit('shot', bullet.id);
		});

		socket.on('newBullet', (bullet) => {
			const newBullet = this.physics.add.sprite(
				bullet.pos.initial.x,
				bullet.pos.initial.y,
				'bullet'
			);

			newBullet.id = bullet.id;
			newBullet.setScale(0.3);
			newBullet.setAngle(bullet.pos.angle);

			this.theirBullets.add(newBullet);
			this.physics.moveTo(
				newBullet,
				bullet.pos.end.x,
				bullet.pos.end.y,
				300
			);
		});

		this.pew = this.sound.add('pew', 0.4);
		this.pew.allowMultiple = true; // ineffective

		this.keys = this.input.keyboard.addKeys('W,A,S,D');

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
		if (this.keys.W.isDown) {
			this.player.y -= this.speed;
			this.cameras.main.scrollY -= this.speed;
		}

		if (this.keys.S.isDown) {
			this.player.y += this.speed;
			this.cameras.main.scrollY += this.speed;
		}

		if (this.keys.A.isDown) {
			this.player.x -= this.speed;
			this.cameras.main.scrollX -= this.speed;
		}

		if (this.keys.D.isDown) {
			this.player.x += this.speed;
			this.cameras.main.scrollX += this.speed;
		}

		if (this.input.activePointer.isDown && this.showDelta() > 100) {
			this.pew.play();
			this.myBullets.fire(this.player.x, this.player.y - 20);
			this.start = this.getTime();
		}

		socket.emit('player', {
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
