const fs = require('fs');
function fileSize(filename, cb){
    if(typeof filename!== 'string'){
        return process.nextTick(
            cb,
            new Error('File name is not correct')
            ) 
    }
    fs.stat(filename,(err,stats)=>{
        if(err){
            return cb(err);   
        }
        cb(null, stats);
    });
}

fileSize(1,(err,data)=>{
    if(err){
        throw err;
    }

    console.log(data.size);
});

console.log('Hello');