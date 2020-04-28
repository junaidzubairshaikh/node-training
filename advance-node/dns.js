const dns=require('dns');

// dns.lookup('pluralsight.com',(err,data)=>{
//     console.log('Data ',data);
// })

dns.resolve('pluralsight.com',(err,data)=>{
    console.log('DATA', data);
})
// dns.reverse('54.149.188.120',(err,data)=>{
//     console.log(data);
// });