import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.status(200).json({
    status: 'success',
    message: 'Welcome to dairy app'
  });
});

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    message: 'This route does not exist.'
  });
});

app.listen(4000, () => {
  // eslint-disable-next-line
  console.log('app is listening to port 4000');
});

export default app;
