module.exports = async (hd) => {
  return await hd.call(
    // 与hd.http模式不同
    // hd.call 内部访问
    // hd.http 外部访问
    // 可以带参数访问，如:
    // test/data.js?say=hello
    'test/data',
    {
      sayWorld: "MyWorld"
    }
  );
};