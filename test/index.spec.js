import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiString from 'chai-string';
import request from 'supertest';
import server from '../src/app';
import Todo from '../src/models/todo.model';

chai.use(chaiHttp).use(chaiString);

describe('Basic Routes', () => {
  before(async () => {
    await Todo.deleteMany({});
  });

  it('should get to home page', async () => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        /* eslint-disable */
        expect(res).to.be.html;
        expect(res.text).to.containIgnoreSpaces('Todo List Koa Application'); //
        /* eslint-enable */
      });
  });

  it('should get add page', async () => {
    request(server)
      .get('/add')
      .expect(200)
      .end((err, res) => {
        /* eslint-disable */
        expect(res).to.be.html;
        expect(res.text).to.containIgnoreSpaces('Add Todo'); //
        /* eslint-enable */
      });
  });

  it('should add a new todo', async () => {
    request(server)
      .post('/add')
      .set('Content-Type', 'application/json')
      .send({ todo: 'Sample Todo' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        /* eslint-disable */
        expect(res).to.be.html;
        return Todo.find({}, 'todo', (err, todos) => {
          expect(todos[0]).to.deep.include({ todo: 'Sample Todo' });
        });
        /* eslint-enable */
      });
  });
});
