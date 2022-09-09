const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../api/server');
const jwt = require('jsonwebtoken');

const { DECODE_MATCHER } = require('./utilForTests');

const { Response } = require('superagent');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota GET "/logged"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).get('/logged')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);

    jwt.verify.restore();
  });
});