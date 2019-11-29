import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Default home route', () => {
  it('Home route should return successfully', async () => {
    const response = await chai.request(app).get('/');
    expect(response.body.message).to.equal('Welcome to dairy app');
    expect(response.statusCode).to.equal(200);
  });
  it('Unknown route should return with proper error message', async () => {
    const response = await chai.request(app).get('/unknownRoute');
    expect(response.body.message).to.equal('This route does not exist.');
    expect(response.statusCode).to.equal(404);
  });
});
