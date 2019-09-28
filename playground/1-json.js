var books = {
    title: 'Humans',
    description: 'Monkey'
}
console.log(books)
console.log(typeof(books))
var bookJSONString = JSON.stringify(books); //JSON string
console.log(bookJSONString);
console.log(typeof(bookJSONString))
var bookJSON = JSON.parse(bookJSONString);
console.log(bookJSON)
console.log(typeof(bookJSON))