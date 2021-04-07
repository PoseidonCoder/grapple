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

		oauth.isSignedIn.listen((status) => {
			if (!status) return;

			console.log(oauth.currentUser.get());
			fetch('api/createUser', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					id: oauth.currentUser.get().Qs.zt,
				}),
			}).catch(console.error);
		});

		resolve(oauth);
	});

	initGapi.catch(reject);
});

loadOauth.catch((error) => {
	console.log('Error loading oauth!');
	console.log(error);
});

export default await loadOauth;
