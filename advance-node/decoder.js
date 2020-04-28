const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf8');


process.stdin.on('readable',()=>{
    const chunk= process.stdin.read();
    if(chunk!==null){
        console.log(chunk);
        const buffer= Buffer.from([chunk]);
        console.log('Buffer to string ',buffer.toString());
        console.log('Buffer Decoder ',decoder.write(buffer));
    }
})