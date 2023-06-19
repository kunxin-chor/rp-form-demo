const express = require('express');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');

// enable the middleware for forms
app.use(express.urlencoded({
    extended: false
}))

app.get('/', function(req,res){
 res.send("Hello World")
})

// create a survey form
// first name and last name (text input)
// diploma or eqv, degree or higher (radio button)
// hobbies - reading, cycling etc. (checkboxes)
// country - singapore, malaysia etc. (select)
app.get('/survey', (req,res) =>{
    res.render('survey');
});

function getCheckboxValue(req, checkboxName) {
    let selectedValue = [];
    if (req.body[checkboxName]) {
        if (Array.isArray(req.body[checkboxName])) {
            // if it is an array the user selects more than one checkbox
            selectedValue = req.body[checkboxName]
        } else {
            // if req.body.hobbies is not array, then it is a string
            // because the user only selected one checkbox
            selectedValue = [ req.body[checkboxName]];
        }
    }
    return selectedValue;
}

// handle POST /survey
app.post('/survey', (req,res)=>{
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const qualification = req.body.qualification ?? "N/A";
    let hobbies = getCheckboxValue(req, 'hobbies');
    // let hobbies = [];
    // if (req.body.hobbies) {
    //     if (Array.isArray(req.body.hobbies)) {
    //         // if it is an array the user selects more than one checkbox
    //         hobbies = req.body.hobbies;
    //     } else {
    //         // if req.body.hobbies is not array, then it is a string
    //         // because the user only selected one checkbox
    //         hobbies = [ req.body.hobbies ];
    //     }
    // }
    // we are ensured that hobbies variable will store an array
    console.log("hobbies =", hobbies);

    console.log(firstName, lastName, qualification);
    res.send("form recieved");
});

app.get('/bmi', (req,res)=>{
    res.render('bmi')
})

app.post('/bmi', (req,res)=>{
    const weight = req.body.weight;
    const height = req.body.height;
    const bmi = weight / height ** 2;
    res.render('bmi-result',{
        'result': bmi
    })
})

app.listen(3000, function(){
    console.log("Server has started")
})