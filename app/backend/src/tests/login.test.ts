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
        email: 'user@user.com',
        password: 'secret_user'
      });
    });

    it('Retorna status 200', async () => {
      expect(chaiResponse).to.have.status(200);
    });
    
    it('Retorna um token', async () => {
      expect(chaiResponse.body).to.have.property('token');
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
      expect(chaiResponse.body).to.have.property('message');
    });
  });

  describe('Testa a rota /login/validate', () => {

    before(async () => {
      chaiResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
      });
    });

    it('Retorna status 200', async () => {
      let result = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', chaiResponse.body.token)
      expect(result).to.have.status(200);
    });
    it('Retorna a role do usuario', async () => {
      let result = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', chaiResponse.body.token)
      expect(result.body).to.have.property('role');
    });
  });

  describe('Testa casos inválidos de acesso a rota /login/validate', () => {
    before(async () => {
      chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', '');
    });

    it('Retorna status 401', async () => {
      expect(chaiResponse).to.have.status(401);
    });
    it('Retorna uma mensagem de erro', async () => {
      expect(chaiResponse.body).to.have.property('message');
    });
  });

  describe('Testa tokens inválidos de acesso a rota /login/validate',() => {
    before(async () => {
      chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'badToken');
    });

    it('Retorna status 401', async () => {
      expect(chaiResponse).to.have.status(401);
    });
    it('Retorna uma mensagem de erro', async () => {
      expect(chaiResponse.body).to.have.property('message');
    });
  });
});
