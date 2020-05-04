function computeNumber(){
    let sum=0;
    for(let i=0; i<1e10; i++){
        sum+=i;
    }

    return sum.toString();
}



process.on('message',() => {
    process.send(computeNumber());
})