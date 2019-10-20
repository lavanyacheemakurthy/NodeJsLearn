const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router();


// router.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);
//     try {
//         const response = await task.save()
//         res.send(response)
//     } catch (e) {
//         res.status(400).send(error)
//     }
    
// })
//Re writing POST with AUTH
router.post('/tasks',auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });
    try {
        const response = await task.save()
        res.send(response)
    } catch (e) {
        res.status(400).send(error)
    }
    
})

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks);
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//Lets authenticate GET by populating only tasks associated with user curently logged in.
// router.get('/tasks', auth,async (req, res) => {
//     try {
//         //const tasks = await Task.find({owner:req.user._id})
//         //THis will work.Lets try other way
//          await req.user.populate('tasks').execPopulate();
//         res.send(req.user.tasks);
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//lets use special options
//GET /tasks?completed=true
//Below has to work fro true , false and if nothing is given.So use req.query. Req.query.completed will return true or false as strings
// router.get('/tasks', auth, async (req, res) => {
//     const match = {};
//     if (req.query.completed) {
        
//         match.completed = req.query.completed ==='true'
//     }
//     try {
//         await req.user.populate({
//             path: 'tasks',
//             match
//           }).execPopulate();
//         res.send(req.user.tasks);
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//Now above will work for
//{ { url } } /tasks?completed=false
//{ { url } } /tasks?completed=true
//{ { url } } /tasks
//pagination
//limit skip
//GET /tasks?limit=10&skip=0 - we will get results of first page
//GET /tasks?limit=10&skip=10 - We wil get 2 nd page results.
//In mongoose we use options in populate.
//GET /tasks?sortyBy=createdAt:desc
//{{url}}/tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {        
        match.completed = req.query.completed ==='true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==="desc" ? -1 :1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit), //{{url}}/tasks?limit=3 //If limit is not provided , mongoose will ignore this option
                skip: parseInt(req.query.skip),//{{url}}/tasks?limit=3&skip=2
                //{{url}}/tasks?limit=2&skip=1 - it will skip 1 st record and shows 2 next records
                sort
                //     : {
                //     createdAt: -1, //1 for ascending and -1 if descending
                //     //completed:1 //all completed tasks will come then all incomplete ones will come
                // }
            }
          }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e)
    }
})
//{{url}}/tasks?sortBy=createdAt:asc&limit=1&skip=2
//This get will work for sortings,paginations
//Now this pagination gets applied when use want to see all rocords are completed and non completed records


// router.get('/tasks/:id', async (req, res) => {
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
//Lets authenticate this endpoint
router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id;
    try {
        console.log(_id);
        console.log(req.user._id)
       // Now find document with 2 search properties
        const task = await Task.findOne({ _id, owner: req.user._id });
        //const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
     }    
})

// router.patch("/tasks/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["description", "completed"]
//     const isValidUpdates = updates.every(update => allowedUpdates.includes(update));
//     if (!isValidUpdates) {
//         return res.status(400).send({ "Error": "Invalid Updates" })
//     }
//     try {
//         const task = await Task.findById(req.params.id);
//         updates.forEach((update) => task[update] = req.body[update]);
//         await task.save();
//        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })        
       
//         if (!task) {
//            return res.status(400).send()
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send({"Error":e})
//     }
// })
router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"]
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdates) {
        return res.status(400).send({ "Error": "Invalid Updates" })
    }
    try {
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        
        if (!task) {
           return res.status(400).send()
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
       // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })        
       
        res.send(task)
    } catch (e) {
        res.status(500).send({"Error":e})
    }
})

//Try updating a task of id associated with some other user.It will be 400

// router.delete('/tasks/:id', async(req, res) => {
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

router.delete('/tasks/:id',auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
             return res.status(400).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send({"Error":e}) // dont miss AWAIT keyword
    }
})
//With this a task will be deleted only if it is created by logged in user.
module.exports = router
    