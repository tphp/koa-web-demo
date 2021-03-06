const Koa = require("koa");
const KoaWeb = require('koa-web');

const app = new Koa();

app.use(
  KoaWeb(
    {
      // 项目根路径
      path: __dirname,

      // 静态文件路径组，默认指向static
      // 模式1: static: "static"
      // 模式2: static: ["static"]
      // 模式3: static: {static: "static"}
      // 模式1、2、3效果相同，如果想指定项目外目录须使用模式3
      static: {
        static: "static"
      },

      // 静态文件缓存时间，默认0毫秒
      staticMaxage: 0,

      // 视图模块设置
      view: {
        // 视图默认目录 html
        path: "html",

        // 视图文件默认扩展名 html， 如 "hello.html"
        ext: "html",

        // 域名(前缀)绑定路径设置
        domains: {
          // 如访问: http://www.hello.myweb.com:90
          // 实际解析到: myweb90/tools 目录
          // 相当于 view 中的 path 设置为: html/myweb90/tools
          // 左边: www.*.{abc}.com:{port}不能混合参数，如 www.*.{abc}{def} 中的 {abc}{def} 将无法解析
          // 右边: {abc}{port}/tools 可以随意混合参数
          "www.*.{abc}.com:{port}": "{abc}{port}/tools",

          // 权重1: 域名前缀数量越多，权重越高
          // 如访问: http://www.a.com:88 将解析到 xyz
          // 如访问: http://www.b.com:88 将解析到 abc
          "www:88": "abc",
          "www.a:88": "xyz",

          // 权重2: 参数越少，权重越高
          // 如访问: http://www.a.com 将解析到 hello
          // 如访问: http://www.b.com 将解析到 world
          "www.a.com": "hello",
          "www.{name}.com": "world", // 等价于: "www.*.com": "world"

          // 绑定所有域名/IP的90端口， 但权重最低
          ":90": "path",
        
          // :90 权重高于 :{path}
          // ":{path}": "new/path",
        },

        // 默认解析路径，不支持变量设置，如: {abc}/tpl
        // 当domains中配对不成功时生效
        // 默认为空，即根目录 html
        domainDefault: ""
      },

      // 热加载，如果不缓存，每次文件改动会重新加载
      // 生产环境可设置为true提高性能
      cache: false,

      // 错误页面默认设置，只支持 404 和 500 错误
      errors: {
        // 也可以 404: "errors.404"， 效果相同
        404: "errors/404",
        500: "errors/500"
      },

      // json配置文件全局配置，会和视图目录中的 ".json" 文件合并
      json: {
        // js: "hello.js",
        // css: ['hello.css', 'world.css'],
        // layout: "layout.test"
      },

      // 扩展页面默认Content-Type设置，如果不设置则以mime-types扩展名为准
      // extTypes: {
      //   // 例如 /hello/world.txt 的设置 Content-Type："text/plan"
      //   txt: "text/plan"
      // },

      // 扩展页面执行后回调
      extCalls: {
        // 访问： http://localhost:3000/任意路径.sh
        // 同步模式
        // extData: 调用任意路径下的扩展页面数据
        sh: (extData, hd, data, files) => {
          // 优先级高于 extTypes 配置
          hd.ctx.type = 'text/plain';

          return extData;
        },

        // 访问： http://localhost:3000/任意路径
        // 异步模式
        // 默认页面 htm、html和无扩展
        // html: async () => {
        //   return "hello world!";
        // }
      },

      // 如果不习惯默认的nunjucks模板引擎， 可以使用render进行重设
      // template: 模板页面源码
      // viewData: 渲染的数据
      // info: 如果template不能满足要求，info中有更多信息提供使用
      // render: (template, viewData, info) => {
      //   // ****字符串模式****
      //   let ejs = require('ejs');
      //   return ejs.render(template, viewData);

      //   // *****文件模式*****
      //   let error;
      //   let html;
      //   ejs.renderFile(info.filename, viewData, (e, h) => {
      //     error = e;
      //     html = h;
      //   });

      //   if (error) {
      //     info.handle.ctx.response.status = 500;
      //     return error['message'];
      //   }
      //   return html;
      // },
    }
  )
);

// app.use(KoaWeb({path: __dirname})); // 快捷默认配置

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});