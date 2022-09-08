const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../api/server');
const { User } = require('../database/models');
const JWT = require('../utils/generateJWT');
const md5 = require('../utils/hashMD5');

const { USER_MATCHER, LOGIN_MATCHER, TOKEN_MATCHER } = require('./utilForTests');

const { Response } = require('superagent');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota POST "/login"', () => {
  before(() => {
    sinon
      .stub(User, "findOne")
      .resolves(USER_MATCHER);

    sinon
      .stub(JWT, "generateJWT")
      .resolves(TOKEN_MATCHER);
  });

  after(()=>{
    User.findOne.restore();
    JWT.generateJWT.restore();
  });

  it('Quando o login acontece corretamente', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'caio@santos.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(LOGIN_MATCHER)
  });

  it('sem o campo "email"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"email\" is required" })
  });

  it('com o campo "email" no formato inválido', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'invalid',
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"email\" must be a valid email" })
  });

  it('sem o campo "password"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"password\" is required" })
  });

  it('com o campo "password" menor que 6', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: '12345',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "\"password\" length must be at least 6 characters long" })
  });
});

describe('Quando o login não acontece:', () => {
  it('com o "email" não existe', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
    
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      });
    
    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.be.eql({ message: "Email or password incorrect" })

    User.findOne.restore();
  });

  it('com o "password" incorreto', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(USER_MATCHER)
    sinon
      .stub(md5, "validateMD5")
      .resolves(false)
    
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      });
    
    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.be.eql({ message: "Email or password incorrect" })

    User.findOne.restore();
    md5.validateMD5.restore();
  });
});
