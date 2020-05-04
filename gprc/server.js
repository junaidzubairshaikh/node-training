const path = require('path');
const Mali = require('mali');

const PROTO_BUFF_PATH = path.resolve(__dirname,"protos","hello.proto");

const echo = async ctx => {
    console.log('Request Received');
    ctx.res={
        abc:'junaid',
        message:ctx.request.req.message,
        timestamp:Date.now()
    }
}

const main=()=>{

    const app=new Mali(PROTO_BUFF_PATH,"Gello",{
        defaults:true
    });

    app.use({echo});
    app.start("127.0.0.1:5100");

    console.log("Listening on 5100...");
};


main();