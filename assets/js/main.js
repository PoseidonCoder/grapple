kaboom.import();
init({
	fullscreen: true,
	scale: 2,
});

scene('main', () => {
	add([text('hello world'), pos(100, 100)]);
});

start('main');
