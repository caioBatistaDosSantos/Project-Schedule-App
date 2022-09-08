const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../api/server');
const { User } = require('../database/models');
const JWT = require('../utils/generateJWT');

const { CREATE_USER_MATCHER, REGISTER_MATCHER, TOKEN_MATCHER } = require('./utilForTests');

const { Response } = require('superagent');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota POST "/register"', () => {
  it('Quando o registro acontece corretamente', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(false);

    sinon
      .stub(User, "create")
      .resolves(CREATE_USER_MATCHER);

    sinon
      .stub(JWT, "generateJWT")
      .resolves(TOKEN_MATCHER);

    const response = await chai.request(app).post('/register')
      .send({
        email: 'brett@email.com',
        password: '123456',
        name: 'Brett Wiltshire'
      });

    expect(response.status).to.be.equal(StatusCodes.CREATED);
    expect(response.body).to.be.eql({ token: TOKEN_MATCHER, ...REGISTER_MATCHER })

    User.findOne.restore();
    User.create.restore();
    JWT.generateJWT.restore();
  });

  it('sem o campo "name"', async () => {
    const response = await chai.request(app).post('/register')
      .send({
        email: 'brett@email.com',
        password: '123456'
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"name\" is required" })
  });

  it('com o campo "name" menor que 12', async () => {
    const response = await chai.request(app).post('/register')
      .send({
        email: 'brett@email.com',
        password: '123456',
        name: 'name'
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"name\" length must be at least 12 characters long" })
  });

  it('Quando ja existe um usário com mesmo nome ou email', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(true);

    const response = await chai.request(app).post('/register')
      .send({
        email: 'brett@email.com',
        password: '123456',
        name: 'Brett Wiltshire'
      });

    expect(response.status).to.be.equal(StatusCodes.CONFLICT);
    expect(response.body).to.be.eql({ message: 'User already registered' })

    User.findOne.restore();
  });
});
