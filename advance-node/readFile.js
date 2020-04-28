
const fs=require('fs');

function someAsynOptions(callback){

    fs.readFile(__filename,callback);
}



const timeoutScheduled=Date.now();



setTimeout(()=>{
    const timeOut=Date.now()- timeoutScheduled;
    console.log('Set Timout called after', timeOut);
},50);



someAsynOptions((err,data)=>{
    const startCallback=Date.now();

    console.log(data);
})