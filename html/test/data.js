module.exports = async (hd) => {
  return {
    sayHello: "hello",
    sayWorld: hd.getView('sayWorld')
  };
};