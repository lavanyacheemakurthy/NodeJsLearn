//nodemon src/app.js
// const path = require('path');
// const express = require('express');

// //console.log(__dirname);
// console.log(path.join(__dirname,'../public'))
// //console.log(__filename);
// var app = express();
// const publicDirectotyPath = path.join(__dirname, '../public');
// //npm i hbs@4.0.4
// //telling express that hbs is templating enginee we installed
// app.set('view engine', 'hbs')  //now our engine is hbs engine not html files
// //setting hbs(express handle bars) with name view enginee to generate dynamic templates
// //templates should be in views folder from root
// //as we created hbs file delete index.html as we are using index.hbs;
// app.use(express.static(publicDirectotyPath));

// //now we created about.hbs , so delete about.html as we wont use it

// app.get('', (req, res) => {
//     res.render('index', {
//         title: "Weather",
//         name:"Lavanya Cheemakurthy"
//     }); //as we want to load index.hbs
// })

// app.get('/about', (req, res) => {
//     res.render('about', {        //as hbs is installed , it takes us to views/about.hbs
//         title: "About me",
//         name:"Lavanya Cheemakurthy"
//     }); //as we want to load index.hbs
// })
// app.get('/help', (req, res) => {
//     res.render('help', {            //as we are use Render and installed handle bars its going to help.hbs file 
//         helpText:"This is some helpful text"
//     })
// })
// // app.get('', (req, res) => {
// //     res.send('<h1>Weather</h1>'); //if we write app.use() , this is never used as that will be static with '' path
// // })
// // app.get('/help', (req, res) => {
// //     res.send({
// //         name: "Lavanya",
// //         age:23
// //     });
// // })
// // app.get('/about', (req, res) => {
// //     res.send('<h1>About</h1>');
// // }) 
// //As we have set public folder to be reached with '' , 
// //in browser, if we go to http://localhost:4000/about.html , it takes path as public/about.html
// app.get('/weather', (req, res) => {
//     res.send({
//         forecaste: 'Its chilling',
//         name:"Hyd"
//     });
// })

// app.listen(4000, () => {
//   console.log('server is runningon 4000')  
// })


//How to customise hbs
//how to customise views location
//rename views to templates
//localhost:4000/help
//Error: Failed to lookup view "help" in views directory "C:\Users\cheemaks\Learnings\NodeJs\web-server\views"
//we have to configure it


const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecaste = require('./utils/forecast')
//console.log(__dirname);
console.log(path.join(__dirname, '../public'))
//console.log(__filename);
var app = express();
const port = process.env.PORT||4000;


//defining paths for Express config
const publicDirectotyPath = path.join(__dirname, '../public');

//const viewsPath = path.join(__dirname, '../templates') // get path for views

//We want to use partials for headers and footers so in templates folder keep 2 folders
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials'); //get partials path

//npm i hbs@4.0.4
//telling express that hbs is templating enginee we installed
//setuo handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); //register partials for app
//set it //localhost:4000/help starts working
//setting hbs(express handle bars) with name view enginee to generate dynamic templates
//templates should be in views folder from root
//as we created hbs file delete index.html as we are using index.hbs;

//setup static directory to serve
app.use(express.static(publicDirectotyPath));

//now we created about.hbs , so delete about.html as we wont use it

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Sai Lavanya Cheemakurthy"
    }); //as we want to load index.hbs
})

app.get('/about', (req, res) => {
    res.render('about', {        //as hbs is installed , it takes us to views/about.hbs
        title: "About me",
        name: "Sai Lavanya Cheemakurthy"
    }); //as we want to load index.hbs
})
app.get('/help', (req, res) => {

    res.render('help', {
        title: "Help",
        name: "Sai Lavanya Cheemakurthy",         //as we are use Render and installed handle bars its going to help.hbs file
        helpText: "This is some helpful text"
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>'); //if we write app.use() , this is never used as that will be static with '' path
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name: "Lavanya",
//         age:23
//     });
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// }) 
//As we have set public folder to be reached with '' , 
//in browser, if we go to http://localhost:4000/about.html , it takes path as public/about.html
// app.get('/weather', (req, res) => {
//     res.send({
//         forecaste: 'Its chilling',
//         name: "Hyd"
//     });
// })
// app.get('/help/*', (req, res) => {
//     res.send('No page in Help with the specified route')   //localhost:4000/help/data
// })
// app.get('*', (requ, res) => {  //match all paths which are not mentioned above and this GET should be at last
//     res.send('My 404 page')  //once express finds match url , then it skips reading remaining routes,so it should be at last
// })                              //localhost:4000/data

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecaste(latitude, longitude, (error,forcasteData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecaste: forcasteData,
                location,
                address:req.query.address
            })
        })
    })
    
})
//nodemon src/app.js
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })

})
//node src/app.js
//http://localhost:4000/products?search=games&rating=5
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        name: "Lavanya Cheemakurthy",
        errorMessage: "Help route not found"

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Lavanya Cheemakurthy",
        errorMessage: "Page not found"

    })
})
app.listen(port, () => {
    console.log('server is running on '+port)
})
