
//>node 8-promises.js
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        },2000)
    })
}
//Promise inside promise
// add(2, 3).then(result=>{
//     console.log(result);
//     add(result, 5).then(sum2 => {
//         console.log(sum2)
//     }).catch(e => {
//         console.log(e)
//     })
// }).catch(e => {
//     console.log(e)
// })

//Promise chainign
add(1, 11).then(sum => {
    console.log(sum)
    return add(sum,4)
}).then(sum2 => {
    console.log(sum2)
}).catch(e => {
    console.log(e)
})