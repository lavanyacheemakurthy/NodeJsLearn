console.log("I am from utils.js page!")
const lastName = "Cheemakurthy"

const add = function(a,b){
    return a+b;
}
//module.exports=lastName;  //this wll be returned at all places which imports this js file
module.exports = add;