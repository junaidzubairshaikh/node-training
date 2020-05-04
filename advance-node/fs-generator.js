const fs=require('fs');
const path=require('path');
const dirName=path.join(__dirname,'files');

// creting files 
// fs.exists(dirName,(isExist)=>{
//     if(!isExist){
//         process.nextTick(
//             fs.mkdirSync,
//             dirName
//         )
//     }
// })

// const ms1Day=60*60*24*1000;
// for(let i=0; i<10; i++){
//     const filename=path.join(dirName,`file${i}`);

//     fs.writeFile(filename,i,(err)=>{
//         if(err) throw err;

//         const time= (Date.now()- i*ms1Day)/1000;

//         fs.utimes(filename,time,time,(err)=>{
//             if(err) throw err;
//         });

//     })
// }


//deleting files





const files=fs.readdirSync(dirName);

const ms1Day=60*60*24*1000;
files.forEach(file=>{
    const filename=path.join(dirName,file);
    fs.stat(filename,(err,stats)=>{
        if(err) throw err;

        if(Date.now()-stats.mtime.getTime()> ms1Day*7){
            fs.unlink(filename,(err)=>{
                if(err) throw err;
                console.log('File deleted ',filename);
            })
        }
    })
})