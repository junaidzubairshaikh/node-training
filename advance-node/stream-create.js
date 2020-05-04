const fs=require('fs');
const file=fs.createWriteStream('big-file.text');
for(let i=0; i<1*4000000; i++ ){
    const content='A quick brown fox jumps over the lazy dog. A qucik brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog.'
    // fs.writeFileSync('big-file.text',content,{flag:'a'})
    
    file.write(content);
}


// file.end();