

exports.contents=[1];
require('./m2');
console.log('Required module 2 ',require.main===module);
exports.contents.push(11);
exports.contents.push(111);

// console.log('Module 1 loaded ',module);