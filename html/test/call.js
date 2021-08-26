module.exports = async (hd) => {
  return await hd.call(
    'test/data',
    {
      sayWorld: "MyWorld"
    }
  );
};