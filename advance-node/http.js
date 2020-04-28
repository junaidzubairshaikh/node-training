const server=require('http').createServer();
let counter=0;

server.on('request',(req,res)=>{
    res.write(`Hello world.. connection no: ${++counter}`);

    setTimeout(()=>{
        res.write('Server send some stream after 4 second')
    },4000);
});

server.timeout=1000;
server.listen(3000);