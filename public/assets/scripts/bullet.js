class bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');

		this.scene = scene;
		this.sceneWidth = this.scene.cameras.main.centerY * 2;
		this.sceneHeight = this.scene.cameras.main.centerX * 2;
	}

	fire(x, y) {
		socket.emit('newBullet', {
			angle: this.scene.player.angle,
			initial: {
				x,
				y,
			},
			end: {
				x: this.scene.input.mousePointer.x,
				y: this.scene.input.mousePointer.y,	
			}
		});
		this.body.reset(x, y);

		this.angle = this.scene.player.angle;

		this.scene.physics.moveTo(
			this,
			this.scene.input.mousePointer.x,
			this.scene.input.mousePointer.y,
			300
		);

		this.setActive(true);
		this.setVisible(true);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (
			this.y <= 0 ||
			this.y >= this.sceneHeight ||
			this.x <= 0 ||
			this.x >= this.sceneWidth
		) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

class bulletGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 40,
			key: 'bullet',
			setScale: {
				x: 0.07,
				y: 0.07,
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
