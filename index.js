const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const { strInRegex, idleStrRegex, wordBrRegex, letterSearch } = require('./regex');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Enable CORS
app.use(cors());

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Import Routes
// const cityRoute = require('./routes/city');
// const stateRoute = require('./routes/state');

// app.use('/city', cityRoute);
// app.use('/state', stateRoute)

// Connection
const uri = "mongodb+srv://read-covid-live:read-covid-live@urja-lvfxu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let City;
let State;
client.connect(err => {
    City = client.db("covid-live").collection("city-main");
    State = client.db("covid-live").collection("state-main");
});



// Route
app.get('/ping', (req, res)=>{

    console.log("##### Wakeup call from heroku at: "+new Date().toString());
    res.status(200).json({
        status: 200,
        time: new Date().toString(),
    });
})

app.get('/city/:cityname', (req, res)=>{
    if (!client.isConnected) {
        console.log(client+ " is disconnected!")
        client.connect(err => {
            City = client.db("covid-live").collection("city-main");
        });
    }
    
    let cityname = req.params.cityname.toLowerCase();
    City.find({city: wordBrRegex(cityname)}).toArray()
        .then(citydata => {
            // console.log('Result: '+data)
            res.status(200).json(citydata);
        });
})

app.get('/state/:statename', (req, res)=>{
    if (!client.isConnected) {
        client.connect(err => {
            State = client.db("covid-live").collection("state-main");
        });
    }
    let region = req.params.statename.toLowerCase();
    
    State.find({
        $or: [
            { state: idleStrRegex(region) },
            { county: strInRegex(region, 'county') }
        ]
    }).toArray().then(data => {
        res.status(200).json(data)
    })
})

app.get('/state/code/:statecode', (req, res)=>{
    if (!client.isConnected) {
        client.connect(err => {
            State = client.db("covid-live").collection("state-main");
        });
    }
    let regioncode = req.params.statecode.toLowerCase();
    
    State.find({
        $or: [
            { statecode: wordBrRegex(regioncode) },
            { countycode: idleStrRegex(regioncode) }
        ]
    }).toArray().then(data => {
        res.status(200).json(data)
    })
})

// Search for region (city, state, country)
app.get('/search/:regionStr', (req, res) =>{
    if (!client.isConnected) {
        client.connect(err => {
            State = client.db("covid-live").collection("state-main");
            City = client.db("covid-live").collection("city-main");
        });
    }
    let regionStr = req.params.regionStr.toLowerCase();

    State.find({
        state: letterSearch(regionStr),
    }).toArray().then(stateData => {
        City.find({
            city: letterSearch(regionStr)
        }).toArray().then(cityData => {
            res.status(200).json([...cityData, ...stateData]);
        });
    });
})
    
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});



