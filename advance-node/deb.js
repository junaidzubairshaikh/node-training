function negativeSum(...args){
    return args.reduce((prev,item)=>{
        return item-prev
    })
}


console.log(
    negativeSum(1,4,8)
);


// node --inpect-brk deb.js --> then open 'chrome://inspect' in chrome tab