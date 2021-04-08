import globals from '../util/globals';
import bulletGroup from '../util/bullet';
import Player from '../util/player';
import loadingBar from '../util/loadingBar';
import oauth from '../util/oauth';
import * as name from '../util/name';

import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'game',
		});
	}

	async init() {
		this.speed = 5;
		this.score = 0;
		this.sprintAcceleration = 3;
		this.name = oauth.isSignedIn.get()
			? await name.getName()
			: name.askName();
	}

	preload() {
		this.load.image('player', 'images/player.png');
		this.load.image('bullet', 'images/bullet.png');
		this.load.image('enemy', 'images/enemy.png');
		this.load.image('grass', 'images/grass.png');

		this.load.audio('pew', 'sounds/shoot.mp3');
		this.load.audio('music', 'sounds/music.mp3');

		loadingBar(this);
	}

	create() {
		this.start = this.getTime();

		globals.socket.emit('ready');

		const music = this.sound.add('music', {
			volume: 0.03,
			loop: true,
		});
		music.play();

		this.pew = this.sound.add('pew', {
			volume: 0.05,
		});

		this.bg = this.add.tileSprite(
			0,
			0,
			globals.mapWidth,
			globals.mapHeight,
			'grass'
		);

		this.bg.setOrigin(0);

		this.scoreText = this.add.text(10, 10, 'Score: 0');
		this.scoreText.setScrollFactor(0, 0);

		this.leaderboardText = this.add.text(
			this.cameras.main.centerX * 2 - 250,
			10,
			''
		);
		this.leaderboardText.setScrollFactor(0, 0);

		globals.socket.on('leaderboard', (leaderboard) => {
			let formattedText = 'Leaderboard:';
			leaderboard.forEach((player) => {
				formattedText += `\n\t${player}`;
			});

			this.leaderboardText.text = formattedText;
		});

		this.players = this.physics.add.group();
		globals.socket.on('newPlayer', (data) => {
			const newPlayer = this.add.sprite(
				data.player.x,
				data.player.y,
				'enemy'
			);

			newPlayer.nameText = this.add.text(
				data.player.x - 40,
				data.player.y - 100,
				data.player.name
			);

			newPlayer.setScale(0.5);
			newPlayer.id = data.id;

			this.players.add(newPlayer);
		});

		globals.socket.on('players', (players) => {
			Object.keys(players).forEach((id) => {
				const playerInfo = players[id];
				if (id != globals.socket.id) {
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

		globals.socket.on('playerLeft', (id) => {
			this.players.getChildren().forEach((player) => {
				if (player.id == id) {
					player.destroy();
					player.nameText.destroy();
				}
			});
		});

		this.physics.world.setBounds(0, 0, globals.mapWidth, globals.mapHeight);
		this.cameras.main.setBounds(0, 0, globals.mapWidth, globals.mapHeight);

		this.player = new Player(this);

		this.myBullets = new bulletGroup(this);
		this.theirBullets = this.physics.add.group();
		this.physics.add.overlap(
			this.theirBullets,
			this.player,
			(player, bullet) => {
				this.player.resetPos();
				globals.socket.emit('shot', bullet.id);
			}
		);

		globals.socket.on('newBullet', (bullet) => {
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

		this.keys = this.input.keyboard.addKeys('W,A,S,D');
		this.shiftKey = this.input.keyboard.addKey(16);

		this.input.on('pointermove', (event) => {
			const angle =
				Phaser.Math.RAD_TO_DEG * // converts the radians to degress
				Phaser.Math.Angle.Between(
					// calculates the angle in radians
					this.player.x,
					this.player.y,
					this.game.input.activePointer.worldX,
					this.game.input.activePointer.worldY
				);
			this.player.setAngle(angle);
		});
	}

	update() {
		let playerSpeed = this.speed;
		if (this.shiftKey.isDown) {
			playerSpeed += this.sprintAcceleration;
		}

		if (this.keys.W.isDown) {
			this.player.y -= playerSpeed;
			this.cameras.main.scrollY -= playerSpeed;
			this.player.resetNameText();
		}

		if (this.keys.S.isDown) {
			this.player.y += playerSpeed;
			this.cameras.main.scrollY += playerSpeed;
			this.player.resetNameText();
		}

		if (this.keys.A.isDown) {
			this.player.x -= playerSpeed;
			this.cameras.main.scrollX -= playerSpeed;
			this.player.resetNameText();
		}

		if (this.keys.D.isDown) {
			this.player.x += playerSpeed;
			this.cameras.main.scrollX += playerSpeed;
			this.player.resetNameText();
		}

		if (this.input.activePointer.isDown && this.showDelta() > 100) {
			this.pew.play();
			this.myBullets.fire(this.player.x, this.player.y - 20);
			this.start = this.getTime();
		}

		this.scoreText.text = 'Score: ' + this.score;

		globals.socket.emit('player', {
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

export default GameScene;
