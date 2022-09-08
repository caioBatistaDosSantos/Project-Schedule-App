const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../api/server');
const { Query } = require('../database/models');
const queriesService = require('../services/queriesService');
const jwt = require('jsonwebtoken');

const { QUERIES_MATCHER, DECODE_MATCHER, NEW_QUERIE_MATCHER } = require('./utilForTests');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste o middleware "validateToken"', () => {
  it('Quando o token não é passado', async () => {
    const response = await chai.request(app).get('/queries')
      .send();

    expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    expect(response.body).to.be.eql({ message: 'Token not found' })
  });

  it('Quando o token não existe', async () => { 
    const response = await chai.request(app).get('/queries')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    expect(response.body).to.be.eql({ message: 'Expired or invalid token' })
  });
});

describe('Teste a rota GET "/queries"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(Query, "findAll")
      .resolves(QUERIES_MATCHER);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).get('/queries')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(QUERIES_MATCHER)

    Query.findAll.restore();
    jwt.verify.restore();
  });
});

describe('Teste a rota POST "/queries"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(queriesService, "createQueries")
      .resolves(NEW_QUERIE_MATCHER);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).post('/queries')
      .send({
        "patientsName": "test patientsName",
        "descripition": "test descripition",
        "totalPrice": 3000,
        "optionPayment": "Crédito",
        "methodPayment": "À vista",
        "installmentsPrice": 1000,
        "dates": ["2022-10-02T19:58:00.000Z", "2022-11-02T19:58:00.000Z", "2022-12-02T19:58:00.000Z"]
      })
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(NEW_QUERIE_MATCHER)

    queriesService.createQueries.restore();
    jwt.verify.restore();
  });

  it('Caso de falha:', async () => {
    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).post('/queries')
      .send({
        "descripition": "test descripition",
        "totalPrice": 3000,
        "optionPayment": "Crédito",
        "methodPayment": "À vista",
        "installmentsPrice": 1000,
        "dates": ["2022-10-02T19:58:00.000Z", "2022-11-02T19:58:00.000Z", "2022-12-02T19:58:00.000Z"]
      })
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: '"patientsName" is required' })

    jwt.verify.restore();
  });
});

describe('Teste a rota DELETE "/queries/:id"', () => {
  it.only('Caso de sucesso:', async () => {
    sinon
      .stub(Query, "destroy")
      .resolves(null);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).delete('/queries/1')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql({ message: 'Query deleted successfully' })

    Query.destroy.restore();
    jwt.verify.restore();
  });
});