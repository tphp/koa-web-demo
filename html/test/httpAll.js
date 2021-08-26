/**
 * 并发处理请求， 采用Promise.all实现
 * @param {*} hd 
 * @returns 
 */
module.exports = async (hd) => {
  // 第二个参数可选，是否仅返回生成后的配置信息，默认 false
  // hd.httpAll(options, false);

  // Array 列表模式
  let [al, bl] = await hd.httpAll([{
      url: 'http://localhost:3000/test/call?flag=a',
      dataType: 'full'
    },
    {
      url: 'http://localhost:3000/test/call?flag=b'
    },
    // ...
  ]);

  // Object 对象模式
  let {
    a,
    b
  } = await hd.httpAll({
    a: {
      url: 'http://localhost:3000/test/call?flag=a'
    },
    b: {
      url: 'http://localhost:3000/test/call?flag=b'
    },
    // ...
  });

  return {
    al,
    bl,
    a,
    b
  }
};