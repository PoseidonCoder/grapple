class gameScene extends Phaser.Scene {
	constructor() {
		super();

		Phaser.Scene.call(this, {
			key: 'game',
		});
	}

	init() {
		this.speed = 3;
		this.score = 0;
		this.sprintAcceleration = 2;
		this.name = prompt('What would you like to be called?');
	}

	preload() {
		this.load.image('player', 'assets/images/player.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.image('enemy', 'assets/images/enemy.png');
		// this.load.audio('pew', 'assets/sounds/pew.ogg');
	}

	create() {
		this.start = this.getTime();

		socket.emit('ready');

		this.scoreText = this.add.text(10, 10, 'Score: 0');
		this.scoreText.setScrollFactor(0, 0);

		this.leaderboardText = this.add.text(
			this.cameras.main.centerX * 2 - 250,
			10,
			''
		);
		this.leaderboardText.setScrollFactor(0, 0);

		socket.on('leaderboard', (leaderboard) => {
			let formattedText = 'Leaderboard:';
			leaderboard.forEach((player) => {
				formattedText += `\n\t${player}`;
			});

			this.leaderboardText.text = formattedText;
		});

		this.players = this.physics.add.group();
		socket.on('newPlayer', (data) => {
			const newPlayer = this.add.sprite(
				data.player.x,
				data.player.y,
				'enemy'
			);

			newPlayer.nameText = this.add.text(
				data.player.x - 30,
				data.player.y - 100,
				data.player.name
			);

			newPlayer.setScale(0.5);
			newPlayer.id = data.id;

			this.players.add(newPlayer);
		});

		socket.on('players', (players) => {
			Object.keys(players).forEach((id) => {
				const playerInfo = players[id];
				if (id != socket.id) {
					this.players.getChildren().forEach((player) => {
						if (player.id == id) {
							player.nameText.setPosition(
								playerInfo.x - 30,
								playerInfo.y - 100
							);

							player.setPosition(playerInfo.x, playerInfo.y);
							player.setAngle(playerInfo.angle);
						}
					});
				} else {
					this.score = playerInfo.score;
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

		this.physics.world.setBounds(0, 0, mapSize, mapSize);
		this.cameras.main.setBounds(0, 0, mapSize, mapSize);

		this.player = new Player(this);

		this.myBullets = new bulletGroup(this);
		this.theirBullets = this.physics.add.group();
		this.physics.add.overlap(
			this.theirBullets,
			this.player,
			(player, bullet) => {
				this.player.resetPos();
				socket.emit('shot', bullet.id);
			}
		);

		socket.on('newBullet', (bullet) => {
			const newBullet = this.physics.add.sprite(
				bullet.pos.initial.x,
				bullet.pos.initial.y,
				'bullet'
			);

			newBullet.id = bullet.id;
			newBullet.setScale(0.07);
			newBullet.setAngle(bullet.pos.angle);

			this.theirBullets.add(newBullet);
			this.physics.moveTo(
				newBullet,
				bullet.pos.end.x,
				bullet.pos.end.y,
				300
			);
		});

		// this.pew = this.sound.add('pew', 0.4);
		// this.pew.allowMultiple = true; // ineffective

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
			this.player.resetNameText();
			this.cameras.main.scrollY -= this.speed;
		}

		if (this.keys.S.isDown) {
			this.player.y += this.speed;
			this.player.resetNameText();
			this.cameras.main.scrollY += this.speed;
		}

		if (this.keys.A.isDown) {
			this.player.x -= this.speed;
			this.player.resetNameText();
			this.cameras.main.scrollX -= this.speed;
		}

		if (this.keys.D.isDown) {
			this.player.x += this.speed;
			this.player.resetNameText();
			this.cameras.main.scrollX += this.speed;
		}

		if (this.input.activePointer.isDown && this.showDelta() > 100) {
			// this.pew.play(); (unintentianaly restarts audio)
			this.myBullets.fire(this.player.x, this.player.y - 20);
			this.start = this.getTime();
		}

		this.scoreText.text = 'Score: ' + this.score;

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
