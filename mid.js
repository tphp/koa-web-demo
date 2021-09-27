const Koa = require("koa");
const KoaWeb = require('koa-web');

const app = new Koa();

/**
 * setMid: 中间件设置，可叠加，顺序执行
 * setData: 数据设置，可叠加，顺序执行
 * setLoad: koa中间件设置，仅加载一次
 * KoaWeb((setMid, setData, setLoad) => {})
 * 或者
 * KoaWeb(async (setMid, setData, setLoad) => {})
 */
 KoaWeb(async (setMid, setData, setLoad) => {
  // 中间件设置
  setMid("mid", (hd, data, files) => {
    hd.app.test = "koa-web";

    // 如果未设置return或设置以下将继续执行下一个中间件
    // 反之程序不再向下执行并显示返回值
    // return;
    // return null;
    // return undefined;
  });

  setMid("mid", (hd, data, files) => {
    // 访问 http://localhost:3000/任意路径.mid
    // 结果为： {"show":"koa-web"}
    // 不会再向下执行
    return {
      show: hd.app.test
    };
  });

  // 程序执行完成后的数据处理
  // 与extCalls配置不同的是
  // extCalls是在js文件方法调用完之后，所以extCalls是优先执行的
  // 访问 http://localhost:3000/任意路径.src
  setData("src", (src, hd, data, files) => {
    hd.ctx.type = "application/json; charset=utf-8";

    // return后不影响下一个数据处理
    // 并将src数传入到下一个数据处理
    return src;
  });

  // 全局设置， 任何页面都会执行
  // setMid("*", () => {});
  // setData("*", () => {});

  // 默认扩展页面设置： 空、htm、html扩展页面
  // setMid("html", () => {});
  // setData("html", () => {});

  // 可再次对koa中间件进行设置
  setLoad(koaApp => {
    // console.log('此处仅运行一次');
    koaApp.use(async (ctx, next) => {
      await next();
    });
  });
});

app.use(KoaWeb({path: __dirname}));
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});