//console.log("Statting application...!");
//File system -Using build in module
//var fs = require('fs');
// fs.appendFile('greetings.txt',"Hello!! Warm wishes",function(err){
//     if(err){
//         console.log('Unable to write to file');
//     }
// })
//BUt wanted to give custom message
//var os = require('os');
//var user = os.userInfo();
//console.log(user);
// fs.appendFile('greetings.txt',"Hello!! "+user.username+'!',function(err){
//     if(err){
//         console.log('Unable to write to file');
//     }
// })
//we can write strings using TEMPLATE STRINGS using backticks(`) and to evaluate use ${}
// fs.writeFile('greetings.txt',"Hi Lavanya here! ")
// fs.appendFile('greetings.txt',`Hello!! ${user.username} !`,function(err){
//     if(err){
//         console.log('Unable to write to file');
//     }
// })

const  firstName = "Lavanya";
console.log(firstName)
//Using custom file - Module exports
//var names = require('./utils.js')   //lastName is returning form as we kept module.exports
//console.log(names)

//var add = require('./utils')
//console.log(add(9,-11));

// var getNotes = require('./notes');
// var notesFromOthers = getNotes();
// console.log(notesFromOthers)


//Importing npm modules
//>node -v // >npm -v
//to use npm modules do npm init
// npm i validator
//import them with filenames no need of path as like custom js file
// var validator = require('validator')
// console.log(validator.isEmail('lav@gmail.com.com'))
// console.log(validator.isURL("google"))
//Using chalk npm module
//npm i chalk@2.4.1
// var chalk = require('chalk');
// console.log(chalk.bgMagentaBright(chalk.green("Success!!")))
// console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `)
// console.log(chalk.keyword('orange')('Yay for orange colored text!'));
// console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color')); //NOT WORKING
// console.log(chalk.hex('#FF8800').bold('Bold Orange!'));

//using nodemon - no need to  run node app.js on each save
//If we use -g at last while installing, that means we are installing that tool/module on OS which can be accessed in multiple projects
//>npm i nodemon@1.18.5
//>nodemon -v 
//>nodemon app.js
//console.log("test")

//Filesystem and command line arguments
//Get input from user from cmd
//console.log(process.argv[2]);
// const command = process.argv[2];
// if(command=="Lavanya"){
//     console.log("Correct")
// }
// else{
//     console.warn("Wrong")
// }
//console.log(process.argv)
// node app.js Lavanya --desc="This is my cmd parameter test" // means giving a property desc
//node provide any parsing of arguments.We only have to write parsing to find key and value.
//lets see yargs module - to parse cmd arguments 

const yargs = require('yargs');
console.log(yargs.argv)
//>node app.js --help
//>node app.js --version

//customize version number
yargs.version('1.1.2'); 
//>node app.js --version // should give 1.1.2 //NOT WORKING