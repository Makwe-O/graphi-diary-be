import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello Babel', status: res.statusCode });
});

app.listen(4000, () => {
  console.log(`app is listening to port 4000`);
});
