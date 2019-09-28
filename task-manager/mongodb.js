//CRUD create read update delete

const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
const {MongoClient,ObjectID} = mongodb
//const obj = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    //console.log('Connected correctly.')
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Siri',
    //     age:25
    // }, (error,result) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log(result);
    // })
    var id = new ObjectID();
    console.log(id,id.getTimestamp(),id.toHexString());
    var id1 = new ObjectID("abcdefghijkl");
    console.log(id1)
    var id2 = new ObjectID('6162636465666768696a6b6c');
    console.log(id2);
    var id3 = ObjectID.createFromTime(4000);
    console.log(id3)
    var id4 = ObjectID.createFromHexString('6162636465666768696a6b6c')
    console.log(id4)
    // db.collection('tasks').insertMany([{
    //     task: "Get Up",
    //     completed: true
    // },
    // {
    //     task: "Open practice",
    //     completed: true
    // }, {
    //     task: "Continue Learning",
    //     completed: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })
    // db.collection('tasks').insert({
    //     task: "test",
    //     completed:false
    // }).then(result=>{
    //     console.log(result)
    // })
    //     .catch(error => {
    //     console.log(error)
    // })
    db.collection('tasks').findOne({ _id : new ObjectID("5d32986ca799e64bbcd8c4d1") }, (error, res) => {
        if (error) {
            return console.log(error);
        }
        console.log(res)
    })
    // db.collection('tasks').find({ completed: true }).toArray((err, task) => {
    //     console.log(task)
    // })
    // db.collection('tasks').find({ completed: true }).count((err, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').insert({ task: "play songs", completed: true }, (error, res) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(res)
    // })

//     db.collection('tasks').update({ _id: new ObjectID('5d33f8995bde7d3f488af54b') },
//         { task:"listen songs",completed: false }, (errUpdating,resposeUpdating) => {
//             if (errUpdating) {
//            return console.log(errUpdating)
//             }
//             console.log(resposeUpdating)
//    })
// db.collection('tasks').findOne({ _id : new ObjectID("5d32986ca799e64bbcd8c4d1") }, (error, res) => {
//     if (error) {
//         return console.log(error);
//     }
//     res.completed = false
//     db.collection('tasks').update({ _id: new ObjectID('5d32986ca799e64bbcd8c4d1') }, res, (errUp,resUp) => {
//         if (errUp) {
//             return console.log(errUp)
//         }
//         console.log(resUp)
//     })
// })
//     db.collection('tasks').updateOne({ task: "Open practice" }, { $set: { completed: false } }, (e, r) => {
//         if (e) {
//            return console.log(e)
//         }
//         console.log(r)
//    })
})