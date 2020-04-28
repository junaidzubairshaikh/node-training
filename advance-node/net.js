// const net =;

let sockets=[];
let counter=0;

const server=  require('net').createServer();

server.on('connection',(socket)=>{

    socket.id = counter++;
    console.log('Connected a client');
    socket.write('Hey welcome!!! Please write your name');

    socket.on('data',(data)=>{
        if(!sockets[socket.id]){
            socket.name=data.toString().trim();
            sockets[socket.id] = socket;
            socket.write(`Welcome ${socket.name}`);
            return;
        }

        Object.entries(sockets).forEach(([key,cs])=>{
            if(socket.id === key) return;
            cs.write(`${socket.name}`);
            cs.write(`${data}`);
        })
    });

    socket.on('end',()=>{
        delete sockets[socket.id];
        console.log('Client disconnected.');
    });

    // socket.setEncoding('utf8');
});


server.listen(3000);