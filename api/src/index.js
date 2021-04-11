const port = 7070;

const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', console.error);

app.use(require('cors')());
app.use(express.json());

app.post('/api/createUser', (req, res) => {
	console.log('creating user...');
	client.HMSET(
		req.body.id,
		{
			name: '',
		},
		(error) => {
			res.json({
				error,
			});
		}
	);
});

app.post('/api/getName', (req, res) => {
	console.log('getting name...');
	client.HGET(req.body.id, 'name', (error, name) => {
		console.log(name);
		res.json({
			error,
			name,
		});
	});
});

app.post('/api/setName', (req, res) => {
	console.log('setting name...');
	client.HSET(req.body.id, 'name', req.body.name, (error) => {
		res.json({
			error,
		});
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
