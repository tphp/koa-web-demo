module.exports = async (hd) => {
  return await hd.call(
    // 与hd.http模式不同
    // hd.call 内部访问 (相对路径、绝对路径)
    // hd.http 外部访问 (url模式)
    // 可以带参数访问，如:
    // /test/data.js?say=hello
    // data 解析为：/test/data
    // ./data 解析为：/test/data
    // ../data 解析为：/data
    // $.abc 解析为：/test/call.abc
    '/test/data',
    {
      sayWorld: "MyWorld"
    }
  );
};