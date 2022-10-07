import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  let chaiResponse: Response;

  describe('Usuário é válido', () => {

    before(async () => {
      chaiResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'trybe@trybe.com',
        password: 'trybe10'
      });
    });

    it('Retorna status 200', async () => {
      expect(chaiResponse).to.have.status(200);
    });
    
    it('Retorna um token', async () => {
      expect(chaiResponse).to.have.property('token');
    })
  });

  describe('Campo de E-mail vazio', () => {

    before(async() => {
      chaiResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: 'trybe10',
      });
    });

    it('retorna status 400', async () => {
      expect(chaiResponse).to.have.status(400);
    });


    it('retorna uma mensagem', async () => {
      expect(chaiResponse).to.have.property('message');
    });
  });

})
