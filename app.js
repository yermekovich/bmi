const express = require('express');
const bodyParser = require('body-parser');
const bmiCalculator = require('bmi-calc'); // Replace with the actual package name
const https = require('https');
const app = express();
const port = 3000; // Change this to your desired port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bmicalculator.html');
});

// POST route to handle form submission
app.post('/bmicalculator', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    // Calculate BMI using your chosen package
    if (!isNaN(weight) && !isNaN(height)) {
        const bmi = weight / (height * height);
        res.send('Your BMI is: ' + bmi.toFixed(2)); 
    } else {
        res.status(400).send('Invalid input'); 
    }

    // Send the BMI result back to the client
    res.send(`Your BMI is ${bmi}`);
});

app.listen(3000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server OK");
});