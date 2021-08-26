const Koa = require("koa");
const KoaWeb = require('koa-web');
const router = require("koa-router")();

const app = new Koa();
app.use(KoaWeb({path: __dirname}));

router.get("/route/web", async (ctx, next) => {
  await next();
  if (!ctx.body) {
    let ret = await ctx.app.call(
      'test/data',
      {
        sayWorld: "MyWorld"
      }
    );
    ctx.body = ret;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});