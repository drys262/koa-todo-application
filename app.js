const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();
// Replace with DB
const todos = [];
// JSON Prettier Middleware
app.use(json());
// Body Parser
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false
});

router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

async function index(ctx) {
  await ctx.render("index", {
    title: "Todo List Koa Application",
    todos: todos
  });
}

async function showAdd(ctx) {
  await ctx.render("add");
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  todos.push(body.todo);
  ctx.redirect("/");
}

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server started..."));
