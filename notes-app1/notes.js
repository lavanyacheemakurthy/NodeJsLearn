// const getNotes = function(){
//     return "Your notes..."
// }
// module.exports=getNotes;

const fs = require('fs')

// const getNotes = function () {
//     return 'Your notes...'
// }
const getNotes = () => { //short hand syntax
    return 'Your notes...'
}
// const addNote = function (title, body) {
//     const notes = loadNotes()
//     const duplicateNotes = notes.filter(function (note) {
//         return note.title === title
//     })

//     if (duplicateNotes.length === 0) {
//         notes.push({
//             title: title,
//             body: body
//         })
//         saveNotes(notes)
//         console.log('New note added!')
//     } else {
//         console.log('Note title taken!')
//     }
// }
//Making short hand syntax using arrow function
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}
// const saveNotes = function (notes) {
//     const dataJSON = JSON.stringify(notes)
//     fs.writeFileSync('notes.json', dataJSON)
// }
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
// const removeNote = function (title) {
//     var notes = loadNotes();
//     const sameNote = notes.filter(function (note) {
//         return note.title == title
//     })
//     if (sameNote.length == 1) {
//         var existingNOteIndex = notes.indexOf(sameNote[0]);
//         notes.splice(existingNOteIndex, 1);
//         saveNotes(notes)
//         console.log("Removed!!")
//     }
// }
const removeNote = (title) => {
    var notes = loadNotes();
    const sameNote = notes.filter((note) => note.title == title)
    if (sameNote.length == 1) {
        var existingNOteIndex = notes.indexOf(sameNote[0]);
        notes.splice(existingNOteIndex, 1);
        saveNotes(notes)
        console.log("Removed!!")
    }
}

// const loadNotes = function () {
//     try {
//         const dataBuffer = fs.readFileSync('notes.json')
//         const dataJSON = dataBuffer.toString()
//         return JSON.parse(dataJSON)
//     } catch (e) {
//         return []
//     }
// }
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
var chalk = require('chalk')
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('your notes'))
    notes.forEach(element => {
        console.log(element.title)
    });
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}