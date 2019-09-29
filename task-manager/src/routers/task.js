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
router.get('/tasks', auth,async (req, res) => {
    try {
        //const tasks = await Task.find({owner:req.user._id})
        //THis will work.Lets try other way
         await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e)
    }
})

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
    