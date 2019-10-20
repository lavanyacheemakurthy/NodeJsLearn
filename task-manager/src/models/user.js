const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase:true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type:Buffer
    }
}, {
    timestamps:true
})

//this is setting up virtual relation from User to Task to find what are all the tasks associated with particular user.
//this is just for mongoose to find relation, who owns what 
//Set up 2 other fields , local field  and foreign field
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', //id of user - this is value of current model used as value in foreignField/owner in Task model
    foreignField:'owner' //Name of field on Task that is going to set the relationship b/w 2 models
})


//to use mongoose middleware to say when any action has to be triggered, when creating a model we have to make little changes.
//2nd object is actually schema. So use a seperate schema object to create it and apply middleware operation PRE
userSchema.pre('save', async function (next) { // using moongose middleware
    const user = this;

    if (user.isModified('password')) {
        user.password  = await bcrypt.hash(user.password,8)
    }
    next();
    //If next() is not called, app will hang here.
    
})

//delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
        await Task.deleteMany({ owner: user._id }) 
    next();
})


//userSchema.methods.getPublicProfile = function () {
    userSchema.methods.toJSON = function () {
    const user = this;
        const userObject = user.toObject();
        //console.log("aaaaaaaaaaaaa",userObject)
    //mongoose will give just raw object
    //So lets customise
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject
}
//userSchema.methods will be abailable for instance
//userSchema.statics can be used for collection as a whole
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRETE);
    //console.log('at method',token);
    //store generated token and so as to store add one more field in Schema
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Unable to login")
    }
    //console.log(user.name)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login")
    }
    //console.log(isMatch)
    return user;
}
const User = mongoose.model('User',userSchema )
//Add this 
module.exports = User;