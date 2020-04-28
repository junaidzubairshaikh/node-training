const  screenshots = require('desktop-screenshot');


const captureImages = (noOfImages)=>{
    let count=0;
    let captureScreenInterval = setInterval(()=>{
        if(count === Number(noOfImages)){
            clearInterval(captureScreenInterval);
            return;
        }
    
        screenshots(`ss${count}.jpg`,(err,data)=>{
            if(err){
                console.log('Error occured in ss at count ',count);
                clearInterval(captureScreenInterval);
            }

            count++;
        });
    
    },4000);
}


if(require.main===module){
    const arg = process.argv[2];
    captureImages(arg || 4);
    console.log('Args',typeof arg);
} else {
    captureImages(4)
}


