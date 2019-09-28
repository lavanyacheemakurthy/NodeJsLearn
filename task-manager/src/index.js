const express = require('express');
const jwt = require('jsonwebtoken')
require('./db/mongoose')  //this is to make mongodb up and running
//load user model
//const User = require('./models/user')
//const Task = require('./models/Task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next) => { //express middlware function
//     //console.log(req.method,req.path);
//     if (req.method === 'GET') {
//         res.send("Get requets are disabled")
//     } else {
//         next()   
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send('Under Maintenance. Try after sometime')
// })
app.use(express.json())
//If we write this line , express will automatically parses incoming request body to JSON

app.use(userRouter) //registering
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server running on 3000 port')
})

const bcrypt = require('bcryptjs');
/*const myFunction = async()=>{
    const token = jwt.sign({ _id: "12345" }, 'signature',{'expiresIn':'7 days'})
    //for sign - first argument is payload and second is signature word which user has to remember to authenticate and 3 rd - expiry time
    //if token expires we will get  error: TokenExpiredError: jwt expired
    console.log(token)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NSIsImlhdCI6MTU2Nzg1NTQ1N30.Qq1E1E2_xQLyMPSRXw4mKqa28hspqwhtogZ-OIJw1r8
    //first part-this is base 64 encoded string-  headder - contains type of token, here it is jwt ,and algorithm used 
    //second -this is base 64 encoded string- contains payload {_id:}
    //third - contains - signature which is used by us to verify user
    //Purpose of jwt is not to hide payload , but to verify user to view by signature -signature

    const data = jwt.verify(token, 'signature')
    
    //for verify - 1 st argument should be token and second is signature word
    //if sign is valid , payload is resturned or error
    //data = jwt.verify(token, 'signaturee')
    console.log(data);
    //{ _id: '12345', iat: 1567856016 } - iat means issued at
    //for wrong signature - //UnhandledPromiseRejectionWarning: JsonWebTokenError: invalid signature
    
}
myFunction();*/

/*As we are having so many routes. Group routes by using epress Router and remember to register it to application */
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send("This is send")
// })
// app.use(router) //registering the router with current express application 
//Now move rotes to different pages and import them and register them


//in package file add script for dev using nodemon
//run application - > npm run dev
//go to postman
/* POST localhost:3000/users
{
	"name":"Lavanya Cheemakurthy",
	"email":"lavanya@test.com",
	"password":"White123%"
}
 */

//Mongodb should be running with proper dbpath to get data from users collection
// app.post('/users', (req, res) => {
//      console.log('Body from request from postman:' , req.body)
//     // res.send('Testing')
//     const user1 = new User(req.body)
//     user1.save()
//         .then(responseReceived => {
//             //console.log(responseReceived);
//             res.send(responseReceived) //do not forget this
//         })
//         .catch(error => {
//             //console.log(error);
//             res.status(400).send(error)
//             //test will inappropriate body - "password":"Wh" (validation fail)

//             //if error status code will be different - 400 BAD REQUEST
//     })
// })
//Re writing using async and await
// app.post('/users', async (req, res) => {  //ASYNC is keyword
//     console.log('Body from request from postman:' , req.body)
//     const user1 = new User(req.body)
//     try {
//         await user1.save();  //Await is keyword and this will return a promise in this block
//         res.status(201).send(user1);
//     } catch (e) {
//         res.status(400).send(e)
//     }
   
       
// })


//POSTMAN - POST - localhost:3000/users
//Go to BODY part of POST request  select raw-JSON(applcation/json). to get data from request
/* Keep below body
{
	"name":"Lavanya Cheemakurthy",
	"email":"lavanya@test.com",
	"password":"White123%"
}
 */


// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body);
//     task.save().then(response => {
//         res.send(response)
//     })
//         .catch(error => {
//         res.status(400).send(error)
//     })
//  })

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);
//     try {
//         const response = await task.save()
//         res.send(response)
//     } catch (e) {
//         res.status(400).send(error)
//     }
    
//  })


/*POSTMAN-POST-localhost:3000/tasks
Body:
{
"description":"Finish Node Js Course"
} */


// app.get('/users', (req, res) => {
//     User.find({}).then(users => {
//        res.send(users) 
//     })
//         .catch(e => {
        
//     })
// })
//GET - localhost:3000/users

// app.get('/users', async(req, res) => { 
//     try {
//         const users = await User.find({})  
//         res.send(users)
//     } catch (e) {
//         res.status(400).send();
//    }
// })


//POSTMAN - GET - localhost:3000/users/5d427e5533ceec53200c1995
//o/p
/*{
    "_id": "5d427e5533ceec53200c1995",
    "name": "Lavanya",
    "age": 23,
    "__v": 0
} */
// app.get('/users/:id', (req, res) => {
//     //console.log(req.params);
//     const _id = req.params.id;
//     User.findById(_id).then(result => {
//         if (!result) {
//             return res.status(404).send();
//         }
        
//         res.send(result);
        
//     }).catch(e => {
//         res.status(500).send(e)
//     })
// })
//POSTMAN -GET - wrong id - localhost:3000/users/5d427e5533ceec53200c1991
//Blank o/p - 404 not found.
//But make sure to give id is 24 bits format or else it will throw case to ObjectId type with 500 code

//Re writing using async await
// app.get('/users/:id', async(req, res) => {
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

// app.get('/tasks', (req, res) => {
//     Task.find({}).then(tasks=>{
//         res.send(tasks)
//     }).catch(e => {
//         res.status(500).send(e)
//     })
// })
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks);
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//GET - localhost:3000/tasks
//Re writing using async and await
// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id;
//     Task.findById(_id).then(task => {
//         if (!task) {
//             return res.status(404).send();
//         }
//         res.send(task);
//     }).catch(e => {
//         res.status(500).send(e)
//     })
// })
//GET -localhost:3000/tasks/5d592111a5f3be0e7ce919f5

// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const task = await Task.findById(_id);
//         if (!task) {
//             return res.status(404).send();
//         }
//         res.send(task);
//     } catch (e) {
//         res.status(500).send(e)
//      }

    
// })


//UPDATE - use PATCH REST method
// app.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ["name", "email", "password", "age"];
//     const isValidUpdates = updates.every((update)=> allowedUpdates.includes(update))
//     if (!isValidUpdates) {
//         return res.status(400).send({"Erro":"Invalid updates"});
//     }
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true })
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
//localhost:3000/users/5d582a4cf85f6d383cd8f6ad
/*Body : {
	"name":"Lavanya Chs"
} - Updates */
/*Body :
{
	"xyz" : "ewfew"
} -
 o/p - Error : {
    "Erro": "Invalid updates"
} */
//If we add any others than properties in model , nothing happens but we have to notify user
//Add allowUpdates on


//Update tasks
// app.patch("/tasks/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["description", "completed"]
//     const isValidUpdates = updates.every(update => allowedUpdates.includes(update));
//     if (!isValidUpdates) {
//         return res.status(400).send({ "Error": "Invalid Updates" })
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })        
//         res.send(task)
//     } catch (e) {
//         res.status(500).send({"Error":e})
//     }
// })
//localhost:3000/tasks/5d622f36e3650944e0cc5dd8
//intially completed - false
/*Body:
{
	"completed":true
} - response:
{
    "completed": true,
    "_id": "5d622f36e3650944e0cc5dd8",
    "description": "Temp2",
    "__v": 0
} */
/*Body : {
	"compeeeleted":true
} - response : 
{
    "Error": "Invalid Updates"
}*/

// app.delete('/users/:id', async(req, res) => {
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
//DELETE - localhost:3000/users/5d42b5600102b44db4de55e1

// app.delete('/tasks/:id', async(req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) {
//              return res.status(400).send();
//         }
//         res.send(task);
//     } catch (e) {
//         res.status(500).send({"Error":e}) // dont miss AWAIT keyword
//     }
// })

const pe = {
    name : 'Light'
}
pe.toJSON = function () {
    return {}
}
console.log(JSON.stringify(pe));

