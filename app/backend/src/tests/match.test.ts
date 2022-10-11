import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota matches', () => {
  let chaiResponse: Response;

  describe('Verifica se a rota funciona', () => {

    before(async () => {
      chaiResponse = await chai
      .request(app)
      .get('/matches')
    });

    it('Verifica se retorna status 200', () => {
      expect(chaiResponse).to.have.status(200);
    });
    it('Verifica se retorna um array', () => {
      expect(chaiResponse.body).to.be.an('array');
    });
    it('Verifica se o primeiro item do array é um objeto', () => {
      expect(chaiResponse.body[0]).to.be.an('object');
    });
  });
});
