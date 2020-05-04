const server = require('http').createServer();
const {fork} = require('child_process');

function computeNumber(){
    let sum=0;
    for(let i=0; i<1e10; i++){
        sum+=i;
    }

    return sum.toString();
}


server.on('request',(req,res)=>{
    if(req.url==='/compute'){
        const fi=fork('compute.js');
        fi.send('start');
        fi.on('message',(data)=>{
            res.end(data);
        })
    }else{
        res.end('This is existing');
    }
})

server.listen(3000);
