const fs = require('fs');
const EventEmitter=require('events');


class WitTime extends EventEmitter{
    execute(asyncFunc,...args){
        console.time('execute');
        asyncFunc(...args,(err,data)=>{
         if(err){
            return this.emit('error',err)
         }

         this.emit('data',data);
         console.timeEnd('execute');
        });
    }
}


const emitter=new WitTime();

emitter.prependListener('data',(data)=>{
    console.log('Data event handler ',data.length);
});
emitter.on('data',(data)=>{
    console.log('Data event handler 2 ',data.length);
});

emitter.on('error',(err)=>{
    console.log('Data event handler error',err);
});

emitter.execute(fs.readFile,__filename);

