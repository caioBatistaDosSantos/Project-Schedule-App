const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../api/server');
const { PaymentInstallment } = require('../database/models');
const queriesService = require('../services/queriesService');
const jwt = require('jsonwebtoken');

const { INSTALLMENTS_MATCHER, INSTALLMENTS_MATCHER_BY_DATE, DECODE_MATCHER } = require('./utilForTests');

const { Response } = require('superagent');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota GET "/installments/:id"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(PaymentInstallment, "findAll")
      .resolves(INSTALLMENTS_MATCHER);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).get('/installments/3')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(INSTALLMENTS_MATCHER)

    PaymentInstallment.findAll.restore();
    jwt.verify.restore();
  });
});

describe('Teste a rota GET "/search/installments/:date"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(PaymentInstallment, "findAll")
      .resolves(INSTALLMENTS_MATCHER_BY_DATE);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).get('/search/installments/2022-11-02 19:58:00')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(INSTALLMENTS_MATCHER_BY_DATE)

    PaymentInstallment.findAll.restore();
    jwt.verify.restore();
  });
});

describe('Teste a rota GET "/search/installments/:date"', () => {
  it('Caso de sucesso:', async () => {
    sinon
      .stub(PaymentInstallment, "update")
      .resolves(null);

    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).put('/installments/1')
      .send({ status: true })
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql({ message: 'Updated successfully' })

    PaymentInstallment.update.restore();
    jwt.verify.restore();
  });

  it('Caso de falha:', async () => {
    sinon
      .stub(jwt, "verify")
      .resolves(DECODE_MATCHER);

    const response = await chai.request(app).put('/installments/1')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: 'Enter a valid status' })

    jwt.verify.restore();
  });
});