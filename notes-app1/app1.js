console.log('Command line arguments vs Yargs module');
console.log(process.argv) //> node app1.js test

//console.log(process.argv[2]); //input string
//console.log(process.argv[3]); //input some key value using --
//>node app1.js stringContent --Key=value .Now we can acces two as ust strings,but if we want to parse we 
//cant with process.argv.
//install yargs module
//>npm i yargs@13.2.2
var yargs = require('yargs')
//console.log(yargs.argv); //>node app1.js stringContent --Key=value
//> app1.js --help ->give options available with node ,only 2 help and version.wec an update verson if we need
yargs.version('1.1.0') //NOT WORKING
//But we have to define how a command has to work in yargs
//Creating add command
yargs.command({
    command: 'add',
    describe: "Adding command",
    handler: function () {
        console.log("Adding from command")
    }
})
yargs.command({
    command: 'read',
    describe: "Adding command",
    handler: function () {
        console.log("Reading a node")
    }
})
yargs.command({
    command: 'delete',
    describe: "Adding command",
    handler: function () {
        console.log("Delete a node")
    }
})
//>node app1.js --help
//this will give details of added commands also
//node app1.js add
function generateNameAndTimeStamp() {
    return 'Lavanya ' + new Date();
}
yargs.command({
    command: "printNameandTime",
    desription: "name and time stamp",
    handler: () => {
        console.log(generateNameAndTimeStamp())
    }
})
//node app1.js printNameandTime


//Now we want to give value to key(options to command) using cmd;we can inialise using builder
// yargs.command({
//     command:'addTest',
//     describe:"Adding command",
//     builder:{
//         title:{
//             describe:"its a shopping list"
//         }
//     },
//     handler:function(argv){ // with this statement yargs helps to get args
//         console.log("Adding test" ,argv)
//     }
// })
//>node app1.js addTest --title 'its grocerreies list'  //now we can see this as we gave explicitly
/*[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\cheemaks\\Learnings\\NODEJS\\app1.js',
  'addTest',
  '--title',
  'its grocerreies list' ]
Adding test { _: [ 'addTest' ],
  title: 'its grocerreies list',
  '$0': 'app1.js' }
{ _: [ 'addTest' ],
  title: 'its grocerreies list',
  '$0': 'app1.js' }
  */

//cmd need not be node app1.js addTest --title 'its grocerreies list' , it can be node app1.js addTest
//But as developer we wan title option to be mandatory we have to add demandOption:true
yargs.command({
    command: 'addTest',
    describe: "Adding command",
    builder: {
        title: {
            describe: "its a shopping list",
            demandOption: true,
            //type:'string' // to say expecting a string
        }
    },
    handler: function (argv) { // with this statement yargs helps to get args
        console.log("Adding test", argv.title)
    }
})
//>node app1.js addTest - throws error 'Missing required argument: title'
//in command if we forget to give value to title after declaring as madatory like below
//node app1.js addTest --title
//it will be assigned true
/*[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\cheemaks\\Learnings\\NODEJS\\app1.js',
  'addTest',
  '--title' ]
Adding test { _: [ 'addTest' ], title: true, '$0': 'app1.js' }
{ _: [ 'addTest' ], title: true, '$0': 'app1.js' }
*/

yargs.command({
    command: 'addTest',
    describe: "Adding command",
    builder: {
        title: {
            describe: "its a shopping list",
            demandOption: true,
            type: 'string' // to say expecting a string
        }
    },
    handler: function (argv) { // with this statement yargs helps to get args
        console.log("Adding test      --->", argv.title)
    }
})
//add type
//>node app1.js addTest --title 'its grocerreies list'
/* 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\cheemaks\\Learnings\\NODEJS\\app1.js',
  'addTest',
  '--title',
  'its grocerreies list' ]
Adding test { _: [ 'addTest' ],
  title: 'its grocerreies list',
  '$0': 'app1.js' }*/
//>node app1.js addTest --title
/*Adding test { _: [ 'addTest' ], title: '', '$0': 'app1.js' }*/ //Title take'n as '' as we said type is string
//> node app1.js addTest //error 'Missing required argument: title'


yargs.command({
    command: 'addTestMultiple',
    describe: "Adding command",
    builder: {
        title: {
            describe: "its a shopping list",
            demandOption: true,
            type: 'string' // to say expecting a string
        },
        specialNote: {
            desc: "this is special message"
        }
    },
    handler: function (argv) { // with this statement yargs helps to get args
        console.log("Adding test  title    --->", argv.title)
        console.log("Adding test  spc msg    --->", argv.specialNote)
    }
})
//node app1.js addTestMultiple --title 'its grocerreies list' --specialNote 'I am special Msg'
/*
[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\cheemaks\\Learnings\\NODEJS\\app1.js',
  'addTestMultiple',
  '--title',
  'its grocerreies list',
  '--specialNote',
  'I am special Msg' ]
Adding test  title    ---> its grocerreies list
Adding test  spc msg    ---> I am special Msg
*/


//console.log(yargs.argv);

//instead of console.log yargs.argv we can do yargs.parse();
yargs.parse();