const cluster=require('cluster');
const http=require('http');
const cpus=require('os').cpus().length;
const buffer=require('buffer');


if(cluster.isMaster){
    console.log('Process Master is running with pid--', process.pid);
    // console.log('    Buffer.alloc([10])--',     Buffer.alloc(12,65535));
    const buf=Buffer.from('junaid');
 
    console.log('    Buffer.alloc([10])--' ,buffer.constants.MAX_LENGTH );


    for(let i=0; i<cpus; i++){
        cluster.fork().on('listening',(port)=>{
            console.log('Cluster fork is listening on ', port);
        });
    }
 

    cluster.on('exit',function(worker,code,signal){
        console.log(`Proces exit with ${code} and with signal ${signal} and worker ${worker.toString()} `);
    });
}
 else {
    http.createServer((req,res)=>{
        res.end(`Server created with process ${process.pid}` ,);

        process.kill(process.pid);
    }).listen(8000);

    console.log('Worker process id started---',process.pid);
}
