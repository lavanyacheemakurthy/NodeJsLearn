const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp');
// router.get('/test', (req, res) => {
//     res.send("From a new file")
// }) //http://localhost:3000/test



//REplace app.get with router.get
//signup
router.post('/users', async (req, res) => {  //ASYNC is keyword
   // console.log('Body from request from postman:' , req.body)
    const user1 = new User(req.body)
    try {
        await user1.save();  //Await is keyword and this will return a promise in this block
        const token = await user1.generateAuthToken()
        res.status(201).send({user1,token});
    } catch (e) {
        res.status(400).send(e)
    }  
       
})


//app.
// router.get('/users', async (req, res) => { 
//     try {
//         const users = await User.find({})  
//         res.send(users)
//     } catch (e) {
//         res.status(400).send();
//    }
// })
//Adding middleware function to this specific router - import that function and pass a second argument for router
//
// router.get('/users', auth, async (req, res) => { //for getting used to auth
//     try {
//         const users = await User.find({})  
//         res.send(users)
//     } catch (e) {
//         res.status(400).send();
//    }
// })
router.get('/users/me', auth, async (req, res) => { 
    res.send(req.user)
})
//app.
// router.get('/users/:id', async (req, res) => { //same as /users/me
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(400).send();
//     }
// })

//app.
/*PATCH : localhost:3000/users/5d6e7c42310db6459087d86c 
Body: {
	"name" : "Lav ch",
	"password":"LavLav1@3"
}
Response will be with hashed password  using BCRYPTJS npm module:
{
    "_id": "5d6e7c42310db6459087d86c",
    "name": "Lav ch",
    "email": "user1@test.com",
    "password": "$2a$08$agUsrec07oLPH7lm/gjA.eEcbXQN/0ZPVzf5VaSVH91kD0d7eloii",
    "__v": 0
}*/


// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ["name", "email", "password", "age"];
//     const isValidUpdates = updates.every((update)=> allowedUpdates.includes(update))
//     if (!isValidUpdates) {
//         return res.status(400).send({"Erro":"Invalid updates"});
//     }
//     try {
//         const user = await User.findById(req.params.id)
//         updates.forEach(update => 
//             user[update] = req.body[update]
//         )
//         await user.save() //mongoose middle ware works here. With built in findByIdAndUpdate  , we cant control to hash password.

//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         //id of document we want to update - req.params.id
//         //req.body (holds updates we want to do)- it is like saying object type as in POST we create new User()
//         //{new:true}- This is going to return the new user as opposed to the existing one that was found before the update.
//         //we'll have back the latest data the original user with the updates applied.
//         //runValidators:true - to make validatotors run on update
//         //If there was no user with id given.
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user) //If update happens without error
//     } catch (e) { //If update goes wrong /validation related issue or server error  
//         res.status(500).send({"Error":e});
//     }
// })
/*Now update update profile by chnaging path as like delete and 
chnage url in postman from { { url } } /users/5d6e7c42310db6459087d86c to below route path
and body from {
	"name" : "Lav chh",
	"password":"LavLav1@3"
} to 
{
	"name" : "Lavanya11",
	"password":"Test@11",
	"age":"15"
}

To test if password is chnaged or not : 
go to loginuser request and chnage password as new one and try logging in.
We should be able to login
*/


router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidUpdates = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidUpdates) {
        return res.status(400).send({"Erro":"Invalid updates"});
    }
    try {
        //const user = await User.findById(req.params.id)
        //now as auh came to picture , user is in req.user
        updates.forEach(update => 
            req.user[update] = req.body[update]
        )
        await req.user.save() 
        // if (!user) {
        //     return res.status(404).send();
        // }
        res.send(req.user) //If update happens without error
    } catch (e) { //If update goes wrong /validation related issue or server error  
        res.status(500).send({"Error":e});
    }
})

//app.
// router.delete ('/users/:id', async (req, res) => {
//    //postman - {{url}}/users/5d582a4cf85f6d383cd8f6ad
//     const id = req.params.id;
//     try {
//         const user = await User.findByIdAndDelete(id);
//         if (!user) {
//            return res.status(400).send();
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send({"Error":e});
//     }
// })
//for delete lets apply authentication
//outer.delete('/users/:id', auth, async (req, res) => {
router.delete('/users/me', auth, async (req, res) => {
        
//change route in postman from {{url}}/users/<val> to {{url}}/users/me
    
    //we should not be able to provide other users id anyway.
    //so change path
    //const id = req.params.id;
        //we are using auth now , id will be comming from  req.user of current user
        try {
        const id = req.user._id;
    
        //const user = await User.findByIdAndDelete(id);
        // if (!user) {
        //    return res.status(400).send();
        // }
         await   req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send({"Error":e});
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        //console.log(token)
        //to generate token for specific user - we have to set up method on instance not on collection

        //We should not send back data like passwords.So lets do data hiding
        
       // res.send({ user:user.getPublicProfile() , token })
        //But I dont want to call getPublicProfile always. So in model rename this method to toJSON().So that in res.send no need to call explicitly
        
        res.send({user,token});
    } catch (e) {
        res.status(400).send({"Error": e})
    }
})

//logout
router.post('/users/logout', auth, async(req, res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        //console.log("tokens             -: ", req.user)
        //Before triggering make sure atleast one login request happened for user.
        await req.user.save();
        res.send({LoggedOut : true});
    } catch (e) {
        res.status(500).send("Logging out failed.");
    }
})
//logoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        //loginn few times and logoutAll
        res.send({LoggedOutOfAllSessions : true});
    }catch (e) {
        res.status(500).send("Logging out of all sessions failed.");
    }
})

//posting avatars
// const upload = multer({
//     dest: 'avatars',
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error("Please upload an image."))
//         }
//         cb(undefined,true)
//     }
// })
const upload = multer({
    //dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image."))
        }
        cb(undefined,true)
    }
})

// router.post('/users/me/avatart', upload.single('avatar'), (req, res) => {
//         res.send({ uploaded: true })
//     })
//Now lets do exception handling for multer upload.
//Instead of upload.single('avtar') , lets use a function which throws an exception
// const errorMiddleware = (req, res, next) => {
//     throw new Error("From middleware custom")
// }
// router.post('/users/me/avatart',errorMiddleware , (req, res) => {
//     res.send({ uploaded: true })
// })
//But instead of function , lets use express way of doing it by adding an function with  (error, req, res, next) as arguments  in post
// const errorMiddleware = (req, res, next) => {
//     throw new Error("From middleware custom")
// }

// router.post('/users/me/avatart', auth, upload.single('avatar'), (req, res) => {
//     res.send({ uploaded: true })
// }, (error, req, res, next) => {
//     console.log("in 2nd block from post")
//     res.status(400).send({ error: error.message })
// }
// )

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
            //We should be able to access file here.
            // multer middle ware runs first and saves file  in dest location and gives us response
            //So remove dest property in object creation but just perform validation as is.
            //now req.file.buffer will have data related to binary of file
        // console.log(req.file); //binary format data
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
            //req.user.avatar = req.file.buffer;
            //This is to maintain all profile pics as same size
    req.user.avatar = buffer;
    console.log("about to save buffer")
   await req.user.save();
    //res.send();
    res.send({ avatarUploaded: "Success" }) 
    //go to robo 3t and check if image binary is saved under avatar property
    

}, (error, req, res, next) => {
    console.log("in 2nd block from post")
    res.status(400).send({ error: error.message })
}
)

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send({avatarDeleted:"Success"})
})

router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error();
        }
        console.log("user details :" ,user)
        //res.set('Content-Type', 'image/jpg'); //Setting response type as image
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
        //http://localhost:3000/users/5d90e921914f5461b88def1b/avatar
        //in html use <img src="http://localhost:3000/users/5d90e921914f5461b88def1b/avatar"> and it will displayy image
    } catch (exception) {
        res.status(404).send();
    }
})

module.exports = router;