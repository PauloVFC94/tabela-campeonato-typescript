import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {
    let chaiResponse: Response;
  
    describe('Testa se a rota funciona', () => {
  
      before(async () => {
        chaiResponse = await chai
        .request(app)
        .get('/teams')
      });
  
      it('Retorna status 200', async () => {
        expect(chaiResponse).to.have.status(200);
      });
      
      it('Retorna um array de objetos', async () => {
        expect(chaiResponse.body).to.have.an('array');
        expect(chaiResponse.body[0]).to.be.an('object');
        expect(chaiResponse.body[0]).to.have.property('teamName');
      })
    });
});