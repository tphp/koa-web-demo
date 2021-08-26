const cluster = require('cluster');
const { cpus } = require('os');
const Koa = require("koa");
const KoaWeb = require('koa-web');
const router = require("koa-router")();

const numCPUs = cpus().length;

if (cluster.isPrimary || cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  
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
}