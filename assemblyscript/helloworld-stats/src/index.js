import express from 'express';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import bodyParser from 'body-parser';
import cors from 'cors';

const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();
const port = 3000;

db.defaults({ stats: [] })
	.write();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/record-stat', (req,res) => {
	db.get('stats')
		.push({...req.body})
		.write()
	res.status(200).send();
});

app.get('/get-stat', (req, res) => {
	res.json(db.get('stats'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));