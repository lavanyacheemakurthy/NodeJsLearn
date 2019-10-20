const mongoose = require('mongoose');

// const validator =require('validator')
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:false
    })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim:true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase:true,
//         validate(val) {
//             if (!validator.isEmail(val)) {
//                 throw new Error('Email is not valid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().contains('password')) {
//                 throw new Error('Password cannot contain password')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be positive')
//             }
//         }
//     }
// })
// const me = new User({
//     name: "Lavanya3",
//     age:-23
// })
// const me = new User({
//      name: "Lavanya4",
//      email:'lav@g.com'
// })
// me.save().then((r) =>{
//     console.log(r)
// }).catch((e) => {
//     console.log(e);
// })
// const me1 = new User({
//     name: "Lavanya",
//     age:"test" //this will throw an error
// })
// me1.save().then((r) =>{
//     console.log(r)
// }).catch((e) => {
//     console.log(e);
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type:String
//     },
//     completed: {
//         type:Boolean
//     }
// })



// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim:true
//     },
//     completed: {
//         type: Boolean,
//         default:false
//     }
// })

// const mytask = new Task({
//     description: "Learn Node",
//     completed:false
// })
// mytask.save().then((r) => {
//     console.log(r)
// }).catch((e) => {
//   console.log(e)  
// })