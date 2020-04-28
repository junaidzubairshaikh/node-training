const http=require('http');


const req= http.get('http://www.google.com' 
,
(res)=>{
    // console.log(res);
    console.log('status code ',res.statusCode);
    console.log('Headers ',res.headers);
    res.on('data',(data)=>{
        // console.log('Data received',data.toString());
    })
});
console.log('Agent ',req.agent);
// req.end(); 
