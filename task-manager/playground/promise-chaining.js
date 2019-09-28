require('../src/db/mongoose')
const User = require('../src/models/user')

//ObjectId("5d427e5533ceec53200c1995")
//ObjectId("5d42b4ac954efb05bc547998")

// User.findByIdAndUpdate('5d42b4ac954efb05bc547998', { age: 5 }).then(user => {
//     console.log(user);
//     return User.countDocuments({age:5})
// }).then(docs => {
//     console.log(docs);
    
// }).catch(e => console.log(e))

//for findByIdAndUpdate - we will get deprication warning
//so in mongoose.js add other entry in json argument when writing connect statement
//{ useFindAndModify:false}

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5d42b4ac954efb05bc547998', 15).then((count) => {
    console.log(count);
    
}).catch((e) => {
    console.log('e',e);
    
})