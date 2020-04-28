const EventEmitter=require('events');
const readline=require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.prompt('Hello hi');

const client=new EventEmitter();

const server=require('./server')(client);

server.on('response',(resp)=>{
    // process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write(resp);
    // process.stdout.write('\n\> ');
    // console.log(`Resp ${resp}`);
})


let command,argument;
rl.on('line',(data)=>{
    rl.prompt();
    [command,...argument]=data.split(' ');
  client.emit('command', command, argument);
})