firebase.initializeApp({
	apiKey: 'AIzaSyDXU6Lw0B-Ma_LagtQ4OF-lmmwaAeZGBB8',
	authDomain: 'grapple-ecd1c.firebaseapp.com',
	projectId: 'grapple-ecd1c',
	storageBucket: 'grapple-ecd1c.appspot.com',
	messagingSenderId: '874102344684',
	appId: '1:874102344684:web:5012c4dedb571774974ec9',
	measurementId: 'G-7DFTRDPTLF',
	databaseURL: 'https://grapple-ecd1c-default-rtdb.firebaseio.com/',
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function signIn() {
	auth.signInWithPopup(provider)
		.then((result) => {
			console.log(result);
		})
		.catch(window.alert);
}

document.getElementById('googleSignIn').onclick = signIn;

firebase.analytics();

const game = new Phaser.Game({
	width: 500,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		},
	},
	scene: [gameScene],
});
