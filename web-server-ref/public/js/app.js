console.log('Client side java script file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     })
// })


var weatherForm = document.querySelector('form');
var search = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = "From JS";
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    //console.log(location);
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch('/weather?address='+location).then(
    response => {
        response.json().then(data => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                // console.log(data.location);
               // console.log(data.forecaste);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecaste;
            }

        })
    }
)
    console.log('testing')
})