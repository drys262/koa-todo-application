import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiString from 'chai-string';
import server from '../src/app';
import Todo from '../src/models/todo.model';
import mochaAsync from './testUtils';

chai.use(chaiHttp).use(chaiString);

describe('Basic Routes', () => {
  before(async () => {
    await Todo.deleteMany({});
  });

  it('should get to home page', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        /* eslint-disable */
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.text).to.containIgnoreSpaces('Todo List Koa Application'); //
        /* eslint-enable */
        done();
      });
  });

  it('should get add page', (done) => {
    chai
      .request(server)
      .get('/add')
      .end((err, res) => {
        /* eslint-disable */
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.text).to.containIgnoreSpaces('Add Todo'); //
        /* eslint-enable */
        done();
      });
  });

  it(
    'should add a new todo',
    mochaAsync(async () => {
      chai
        .request(server)
        .post('/add')
        .set('content-type', 'application/json')
        .send({ todo: 'Sample Todo' })
        .end(async (err, res) => {
          /* eslint-disable */
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          return Todo.find({}, 'todo', (err, todos) => {
            expect(todos[0]).to.deep.include({ todo: 'Sample Todo' });
          });
          /* eslint-enable */
        });
    }),
  );
});
