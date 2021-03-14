class bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');

		this.scene = scene;
		this.sceneWidth = this.scene.cameras.main.centerY;
		this.sceneHeight = this.scene.cameras.main.centerX;
	}

	fire(x, y) {
		this.body.reset(x, y);

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
			frameQuantity: 30,
			key: 'bullet',
			setScale: {
				x: 0.3,
				y: 0.3,
			},
			active: false,
			visible: false,
			runChildUpdate: true,
			classType: bullet,
		});
	}

	fire(x, y) {
		const bullet = this.getFirstDead(false);
		if (bullet) bullet.fire(x, y);
	}
}
