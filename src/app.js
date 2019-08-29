import Koa from 'koa';
import json from 'koa-json';
import path from 'path';
import render from 'koa-ejs';
import bodyParser from 'koa-bodyparser';
import router from './router';
import dbconnect from './dbconnect';

const app = new Koa();
// JSON Prettier Middleware
app.use(json());
// Body Parser
app.use(bodyParser());

// Connect MongoDB database
dbconnect();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

// logger
app.use(async (ctx, next) => {
  await next();
  const responseTime = ctx.response.get('Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${responseTime}`); // eslint-disable-line
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  ctx.set('Response-Time', `${duration}ms`);
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 8080;

const server = app.listen(port);

export default server;
