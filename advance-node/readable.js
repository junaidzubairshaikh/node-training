const {Readable}=require('stream');

const rs=new Readable({
    read(size){
        setTimeout(()=>{
            this.push(String.fromCharCode(this.currentCharacterCode++));

            if(this.currentCharacterCode>90){
                this.push(null);
            }
        },100)
    }
});

rs.currentCharacterCode=65;
rs.pipe(process.stdout);


process.on('exit',()=>{
    console.error(`process exited `, rs.currentCharacterCode);
})