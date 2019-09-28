const square = function (x) {
    return x * x;
}

const cube = (y) => {
    return y * y * y
}
const powerFour = (z) => z * z * z * z
console.log(square(5))
console.log(cube(2))
console.log(powerFour(3))

const event = {
    name: "Birthday Party!!",
    printGuestList: function () {
        console.log('Guest list for ' + this.name) //this refers to event object
    }
}
//replace function with arrow function
const event1 = {
    name: "Birthday Party!!", //short hand syntax
    printGuestList: () => {  // arrow function wont bind any own this. This here is what we are using in this context
        console.log('Guest list for ' + this.name)
    }
}
//now write function as functions instead assigning it in a variable , ES6 syntax
const event3 = {
    name: "Birthday Party!!",
    guestList: ['lav', 'siri'],
    printGuestList() {  //lets use iterator
        this.guestList.forEach(function (guest) {
            console.log(guest + ' is attending ' + this.name) // we cant access this of parent within iterators. one solution is use other variables like that and assign before comming inside iterator
        })
    }
}
//We can use arrow function also as arrow functions wont bind their own this value , so this is what we are using in our context
const event4 = {
    name: "Birthday Party!!",
    guestList: ['lav', 'siri'],
    printGuestList() {
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}
event.printGuestList();
event4.printGuestList()