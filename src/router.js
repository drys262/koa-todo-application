import KoaRouter from 'koa-router';
import Todo from './models/todo.model';

async function index(ctx) {
  const todos = await Todo.find();
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
  const { body } = ctx.request;
  const todo = new Todo({ todo: body.todo });
  await todo.save();
  ctx.redirect('/');
}

const router = new KoaRouter()
  .get('/', index)
  .get('/add', showAdd)
  .post('/add', add);

export default router;
