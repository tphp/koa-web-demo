
const fs = require("fs");

/**
 * 提交方式说明
 * get: 非POST提交
 * form: multipart/form-data
 * xform: application/x-www-form-urlencoded
 * json: application/json
 * @param {*} hd 
 * @returns 
 */
module.exports = async (hd) => {
  let options = {
    url: 'http://localhost:3000/test/call?a=123&b=456',

    // 数据代理，支持：get、form、xform、json
    // get 通过浏览器URL和配置url进行合并，其他通过POST和配置data进行合并
    // 默认 {get: false, post: false, header:false}
    // {get: false, all: true} 等价于 {get: false, post: true, header:true}
    proxy: {
      // get: false,
      // post: false,
      // header: false,
      all: true
    },

    // 数据覆盖模式: 默认 asc
    // asc: POST覆盖配置
    // desc: 配置覆盖POST
    proxyCover: 'asc',

    // POST提交数据
    data: {
      abc: "test",
      hello: {
        world: "Is Ok"
      }
    },

    // 提交方式： get、form、xform、json
    // 如果不设置，默认以浏览器提交方式一致
    // type: 'json',

    // 上传文件
    files: {
      // 直接以文件路径提交
      str: "/tmp/abc.jpg",
      // Buffer
      buffer: new Buffer(10),
      bufferFrom: Buffer.from([0, 0]),
      // 使用 fs.createReadStream 需判断文件是否存在，否则会报错
      // fs: fs.createReadStream("/tmp/abc.jpg", { highWaterMark: 10 * 1024 * 1024 }),
      // 数组模式
      array: {
        // path可以是str、buffer和fs
        path: "/tmp/abc.jpg",
        // 可选，默认从path抽取
        name: "abc.jpg",
        // 可选，默认后缀名.jpg进行判断
        type: "image/jpeg"
      }
    },

    // 上传文件最大字节数，默认 10M
    fileMaxSize: 10 * 1024 * 1024,

    // 头文件设置，以下参数将设置无效
    // host, referer, content-length, transfer-encoding, content-type
    header: {
      'User-Agent': 'Mozilla/5.0'
    },

    // 超时设置，默认15秒
    timeout: 15000,

    // 数据返回类型，默认full， HTML是String或Buffer
    // full: 全部返回，{"status": true, "code": 200, "data": HTML, "ms": 62}
    // text：HTML
    // json: JSON.parse("HTML")
    dataType: 'full',

    // 获取二进制，默认为false，如果获取图片之类的须设置为true
    // buffer: false,
  };

  let info = await hd.http(
    options, // 配置信息
    false // 可选，是否仅返回生成后的配置信息，默认 false
  );

  // 通常写法： await hd.http(options);

  return info;
};