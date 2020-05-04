// // console.log('In index .js');


// const findme=require('./lib/find-me');

// console.log('Findme exported',findme);

// console.log('Module in index ' , module);   

const moduleFile=require('./module/m1');
console.log('The require is main ',require.main===module);


// process.stdin.pipe(process.stdout);