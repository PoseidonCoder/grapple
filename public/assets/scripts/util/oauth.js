const loadOauth = new Promise((resolve, reject) => {
	const initGapi = new Promise((resolve, reject) => {
		gapi.load('client', () => {
			gapi.client
				.init({
					apiKey: 'L30fdoj3Mz1RL8KEGEQx8kGR',
					clientId:
						'874102344684-gu4p8e3or2skov57s17tra58v2blvc75.apps.googleusercontent.com',
					scope: 'https://www.googleapis.com/auth/userinfo.email',
				})
				.then(resolve)
				.catch(reject);
		});
	});

	initGapi.then(() => {
		const oauth = gapi.auth2.getAuthInstance();
		oauth.isSignedIn.listen((data) => {
			console.log(data);
		});

		resolve(oauth);
	});

	initGapi.catch(reject);
});

function latchOauth(scene) {
	loadOauth.then((oauth) => {
		scene.oauth = oauth;
	}).catch(console.error);
}

export default latchOauth;
