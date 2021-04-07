import { endpoint } from './globals';
import oauth from './oauth';

export const askName = () => prompt('What would you like to be called?');

export const setName = () => {
	return new Promise((resolve, reject) => {
		const name = askName();
		fetch(endpoint + 'api/setName', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				id: oauth.currentUser.get().Qs.zt,
				name,
			}),
		});

		resolve(name);
	});
};

export const getName = () => {
	return new Promise((resolve, reject) => {
		fetch(endpoint + 'api/getName', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				id: oauth.currentUser.get().Qs.zt,
			}),
		})
			.then((res) => res.json())
			.then(async ({ name }) => {
				resolve(name != '' ? name : await this.setName());
			});
	});
};
