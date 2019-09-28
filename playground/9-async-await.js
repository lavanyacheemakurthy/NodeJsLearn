// const doWork = () => {    
// }
// console.log(doWork()); // undefined


// const doWork = async () => {
//     return "Lavanya"
// }
// //console.log(doWork());  //Promise { 'Lavanya' }

// doWork().then((result) => { //This line needs a promise and async will return a promise
//     console.log(result) //Lavanya
// }).catch(e => {
//     console.log('e',e)
// })


/*const doWorkFail = async () => {
    throw new Error("Lavanya throwed error");
}
console.log(doWork());  //Promise { 'Lavanya' }

doWorkFail().then((result) => { //This line needs a promise and async will return a promise
    console.log(result) //Lavanya
}).catch(e => {
    console.log('e',e)
})

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        },2000)
    })
}
const doWorkSum = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 3);
    return sum3;
}
*/

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a<0||b<0) {
                return reject('Will add only positives')
            }
            resolve(a + b)
        },2000)
    })
}

const doWorkSum = async () => {
    const sum = await add(1, -99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 3);
    return sum3;
}
doWorkSum().then(res => {
    console.log(res);
    
}).catch(e => {
    console.log('e',e);  //e Will add only positives - after 2 sec
    
})
