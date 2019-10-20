require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.insertMany([
//     { description: "post a question", completed: true },
//     { description: "understand response", completed: true },
//     { description: "do analysis", completed: true },
//     { description: "apply suggestions", completed: true },
//     {description:"educate others if needed"}
// ]).then(r => {
//     console.log(r);
    
// }).catch(e => {
//     console.log(e);
    
// })
// Task.insertMany([
//     { description: "Temp1", completed: true },
//     { description: "Temp2", completed: false },
//     { description: "Temp3", completed: true },
//     { description: "Temp4"  },
//     {description:"Temp5"}
// ]).then(r => {
//     console.log(r);
    
// }).catch(e => {
//     console.log(e);
    
// })
//5d59246ebc0d672e9c61ec58
// Task.findByIdAndDelete('5d59246ebc0d672e9c61ec58').then( task=> {
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then(count => {
//     console.log(count);    
// }).catch(e => {
//     console.log(e);
    
// })

//temp3 -5d622f36e3650944e0cc5dd9 -delete
const deleteTaskAndCount = async (id) => {
    const tasks = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false })
    return count;
}
deleteTaskAndCount('5d622f36e3650944e0cc5dd9').then(r => {
    console.log('r ',r);
    
}).catch(e => {
    console.log('e ',e);
    
})
