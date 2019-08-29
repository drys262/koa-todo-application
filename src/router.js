import KoaRouter from 'koa-router';
import Todo from './models/todo.model';
import CommonService from './services/common.service';

async function index(ctx) {
  const TodoService = CommonService(Todo);
  const todos = await TodoService.getAllData();
  await ctx.render('index', {
    title: 'Todo List Koa Application',
    todos,
  });
}

async function showAdd(ctx) {
  await ctx.render('add');
}

// Add thing
async function add(ctx) {
  const TodoService = CommonService(Todo);
  const { body } = ctx.request;
  const data = { todo: body.todo };
  await TodoService.create(data);
  ctx.redirect('/');
}

const router = new KoaRouter()
  .get('/', index)
  .get('/add', showAdd)
  .post('/add', add);

export default router;
