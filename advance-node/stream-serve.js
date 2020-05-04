const http=require('http');
const fs=require('fs');
const server=http.createServer();

server.on('request',(req,res)=>{

    if(req.url==='/data'){
        // fs.readFile('./big-file.text',(err,data)=>{
        //   if(err) throw err;

        //   res.end(data);
        // })

        const rs=fs.createReadStream('./big-file.text');
        rs.pipe(res);
    } else{
        res.end('Server is up')
    }
});


server.listen(3000)