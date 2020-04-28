const http=require('http');

const server=http.createServer((req,res)=>{
    res.end(`Hi there ${process.env.MSG} `);
});


server.listen(8081);
