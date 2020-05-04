const fs=require('fs');
const path=require('path');

const err=fs.createWriteStream(path.join(__dirname,'logs','err.text'));
const out=fs.createWriteStream(path.join(__dirname,'logs','log.text'));

const console2=new console.Console(out,err);

setInterval(() => {
    console2.log(Date.now());
    console2.error(new Error('Some error'));
}, 1000);


