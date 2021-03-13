kaboom.import();

const speed = 2;

init({
	fullscreen: true,
	scale: 2,
});

loadSprite('player', 'assets/images/player.png');

scene('main', () => {
	const player = add([sprite('player'), pos(100, 100)]);

	keyDown('w', () => {
		player.pos.y -= speed;
	});

	keyDown('s', () => {
		player.pos.y += speed;
	});

	keyDown('a', () => {
		player.pos.x -= speed;
	});

	keyDown('d', () => {
		player.pos.x += speed;
	});

	add([player]);
});

start('main');
