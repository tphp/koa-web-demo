/**
 * 默认首页
 * 访问： http://localhost:3000/test/ext
 * @param {*} hd 
 * @returns 
 */
module.exports.html = (hd) => {
  hd.css('ext.css');
  hd.js('ext.js');
  return "这是首页";
};

/**
 * 图片预览
 * 访问： http://localhost:3000/test/ext.jpg
 * @param {*} hd 
 * @returns 
 */
module.exports.jpg = (hd) => {
  // 浏览器页面缓存时间100秒
  // 不设置则不缓存
  // 设置 hd.age() 则页面缓存默认是 staticMaxage 配置值
  hd.age(100);

  // Content-Type 设置
  // 设置优先级如下
  // hd.ctx.type > KoaWeb 中的 extTypes > require("mime-types").types['当前扩展: jpg']
  // hd.ctx.type = 'image/png';
  
  // 文件读取模式
  // hd.read(): /项目根路径/html/test/ext.jpg
  // hd.read('txt'): /项目根路径/html/test/ext.txt
  // hd.read('/home/user/test.txt'): 绝对路径：/home/user/test.txt
  return hd.read();
};

/**
 * 获取其他网页图片并展示
 * 访问： http://localhost:3000/test/ext.png
 * @param {*} hd 
 * @returns 
 */
 module.exports.png = async (hd) => {
  let info = await hd.http({
    url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
    buffer: true
  });

  // 获取图片成功
  if (info.code === 200) {
    return Buffer.from(info.data);
  }

  // 获取图片失败
  // 修改掉默认的 image/png
  hd.ctx.type = "text/plain";
  
  return "无效图片!";
};

/**
 * css文件预览
 * 头文件会自动设置：Content-Type: text/css; charset=utf-8
 * 页面不会缓存
 * 访问： http://localhost:3000/test/ext.css
 */
module.exports.css = `body{ color:#F33; }`;

/**
 * js文件预览
 * 访问： http://localhost:3000/test/ext.js
 * 页面会缓存
 * @param {*} hd 
 * @returns 
 */
module.exports.js = hd => {
  // 这里hd.age就发挥了很大的作用，设置页面缓存将减少请求获取更好的性能
  hd.age(1000);

  // 读取文件 /html/test/ext.x.js 文件
  // return hd.read('x.js');
  
  // 注意：一般不使用 hd.read() 读取本文件 /html/test/ext.js

  // 渲染 /html/test/ext.x.js 文件，默认使用nunjucks模板引擎
  // read是读取二进制文件，render是强制转换成字符串
  // return hd.render({ test: "Hello Test!" }, 'x.js');

  return `console.log('打印测试');`;
};