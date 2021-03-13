kaboom.import();

const speed = 2;

init({
	fullscreen: true,
	scale: 2,
});

scene('main', () => {
	//loadSprite("froggy", "player);

	const player = add([rect(100, 100), pos(100, 100)]);

	// console.log(player);

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
