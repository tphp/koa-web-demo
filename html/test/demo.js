// 模式1： 默认模式
module.exports = async hd => { return "hello ext!"; };

// 模式2：直接返回字符串
module.exports = 'hello ext!';

// 模式3： 对象模式
module.exports.html = 'hello ext!';
module.exports = { html: 'hello ext!' };
module.exports.html = async hd => { return 'hello ext!'; };
module.exports = { html: async hd => { return 'hello ext!'; } };