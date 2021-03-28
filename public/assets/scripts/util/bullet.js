import globals from './globals';
import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');

		this.scene = scene;
	}

	fire(x, y) {
		globals.socket.emit('newBullet', {
			angle: this.scene.player.angle,
			initial: {
				x,
				y,
			},
			end: {
				x: this.scene.game.input.activePointer.worldX,
				y: this.scene.game.input.activePointer.worldY,
			},
		});
		this.body.reset(x, y);

		this.angle = this.scene.player.angle;

		this.scene.physics.moveTo(
			this,
			this.scene.game.input.activePointer.worldX,
			this.scene.game.input.activePointer.worldY,
			300
		);

		this.setActive(true);
		this.setVisible(true);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (
			this.y <= 0 ||
			this.y >= globals.mapHeight ||
			this.x <= 0 ||
			this.x >= globals.mapWidth
		) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

class BulletGroup extends Phaser.Physics.Arcade.Group {
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
			classType: Bullet,
		});
	}

	fire(x, y) {
		const bullet = this.getFirstDead(false);
		if (bullet) bullet.fire(x, y);
	}
}

export default BulletGroup;
