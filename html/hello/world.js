/**
 * 入口文，hd、data和files都可以不设置
 * 如 module.exports = async () => {}; 也是可以的
 * data和files是通过 require("formidable") 实现
 * hd: 主调用函数
 * @param {*} hd 
 * data: form-data、x-www-form-urlencoded和JSON数据会自动转化为该对象
 * @param {*} data 
 * files: 只有在form-data类型中产生
 * @param {*} files 
 * @returns 
 */
module.exports = async (hd, data, files) => {

  // hd.ctx.body = '设置了就只会显示这一段';
  
  // console.log(hd.ctx.query); // url 传递的参数
  // console.log(hd.ctx.header); // http 头文件
  // console.log(data); // data == hd.ctx.app.info.data
  // console.log(files); // files == hd.ctx.app.info.files

  // hd.ctx.app.info.status: 解析状态
  // hd.ctx.app.info.errMessage: 解析错误提示
  // hd.ctx.app.info.body: 原始POST提交字符串
  // hd.ctx.app.info.type: Content-Type标记 form、xform、json
  // form: multipart/form-data
  // xform: application/x-www-form-urlencoded
  // json: application/json
  // console.log(hd.ctx.app.info); 

  // 获取项目中文件路径: /项目路径/hello.js
  // console.log(hd.path("hello.js"));
  // 获取视图中文件路径: /项目路径/html/hello.js
  // console.log(hd.viewPath("hello.js"));

  // 设置模板页面中函数（nunjucks模板）
  hd.view('sayHello', "hello hello!");
  // 多函数设置
  // hd.view({sayHello: "hello hello!", sayOther: "hello other"});
  // 获取函数
  // console.log(hd.getView());
  // console.log(hd.getView('sayHello'));

  // SEO优化（TDK）
  // hd.title('页面标题');
  // console.log(hd.getTitle());
  hd.keywords('关键词');
  // console.log(hd.getKeywords());
  // hd.description('描述');
  // console.log(hd.getDescription());


  // 动态设置页面内CSS和JS
  hd.style(".body{color:#F00;}"); // style只能在head中
  hd.script("var top = 'top';", true); // js 代码在 head 中
  hd.script("var bottom = 'bottom';"); // js 代码在body标签尾部

  // 动态加载css和js文件
  // 加载css不管加不加@都在head标签中或页面顶部
  hd.css('/static/c1.css');
  hd.css(['/static/c2.css', '@/static/c3.css']);
  // 动态js中加@表示在head标签中或页面顶部
  hd.js('/static/j1.js');
  hd.js(['/static/j2.js', '@/static/j3.js']);

  // 设置页面缓存10秒
  // hd.age(10);
  // 如不设置，hd.age()， 则页面缓存默认是 staticMaxage 配置值

  return {
    sayWorld: "hello world!"
  };
}