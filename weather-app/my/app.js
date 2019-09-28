//const request = require('request')
console.log("test")
//const url = 'http://localhost/Nahcm.Api/api/PredefinedMessages/GetPredefinedPayStatementMessages?companyID=1707';
// request({ url: url, json: true }, (error, response) => {
//     console.log(response.body)
//     if (error) {
//         console.log("No response")
//         debugger;
//     }
//     else {
//         debugger;
//         const data = JSON.parse(response.body);
//         console.log(data.PredefinedMessageQualifiersList)
//     }
// })

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a+b)
    },3000)
}

add(1, 2, (sum) => {
    console.log(sum)
})
console.log("one")
console.log("one")
console.log("one")
console.log("one")
console.log("one")
