const EventEmitter=require('events');

class Server extends EventEmitter{
    constructor(client){
        super();
        
        this.task={};
        this.taskid=1;
        process.nextTick(()=>{
            this.emit('response','Type a command ');
        })
        client.on('command',(command,args)=>{
            console.log('Server ',command);

            switch(command){
                case 'help':
                case 'ls':
                case 'add':
                case 'delete':
                    this[command](args);
                    break;
                default:
                    this.emit('response','Unknown');    
            }
        });   
    }

    help(){
        this.emit('response',`Avaialble command
        add task
        ls task
        delte task id`);
    }
    add(args){
        this.task[this.taskid] = args.join(' ');
        this.emit('response', `Added task, ${this.taskid}`);
        this.taskid++;
    }
    ls(){
        this.emit('response',`Tasks: 
        ${this.listString()}`);
    }
    delete(args){
        delete(this.task[args[0]]);
        this.emit('response',`Deleted task id ${this.taskid}`);
    }

    listString(){
        return Object.keys(this.task).map(key=>{
            return `${key} : ${this.task[key]}`
        }).join('\n');
    }
}

module.exports = (client)=>new Server(client);