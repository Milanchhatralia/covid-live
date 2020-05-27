const express = require("express");
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = process.env.PORT || 5000;


// middleware

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));


const uri = "mongodb+srv://read-covid-live:read-covid-live@urja-lvfxu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let City;
let State;
client.connect(err => {
    City = client.db("covid-live").collection("city-main");
    State = client.db("covid-live").collection("state-main");
});


app.get('/city/:cityname', (req, res)=>{
    if (!client.isConnected) {
        console.log(client+ " is disconnected!")
        client.connect(err => {
            City = client.db("covid-live").collection("city-main");
        });
    }
    
    let cityname = req.params.cityname.toLowerCase();
    
    City.find({city: regex(cityname)}).toArray()
        .then(citydata => {
            // console.log('Result: '+data)
            res.status(200).json(citydata);
        });
})

app.get('/state/:statename', (req, res)=>{
    if (!client.isConnected) {
        // console.log(client+ " is disconnected!")
        client.connect(err => {
            State = client.db("covid-live").collection("state-main");
        });
    }
    let region = req.params.statename.toLowerCase();
    
    State.find({
        $or: [
            { state: regex(region) },
            { county: customRegex(region, 'county') }
        ]
    }).toArray().then(data => {
        // console.log('Result: '+data)
        res.status(200).json(data)
    })
})

app.get('/state/code/:statecode', (req, res)=>{
    if (!client.isConnected) {
        // console.log(client+ " is disconnected!")
        client.connect(err => {
            State = client.db("covid-live").collection("state-main");
        });
    }
    let regioncode = req.params.statecode.toLowerCase();
    
    State.find({
        $or: [
            { statecode: regex(regioncode) },
            { countycode: regex(regioncode) }
        ]
    }).toArray().then(data => {
        // console.log("Result: "+ data)
        res.status(200).json(data)
    })
})

const customRegex = (str, addStr) => { return new RegExp("^ ?" + str + " ?"+addStr+" ?", "i") }

const regex = (str) => { return new RegExp("^ ?" + str + " ?", "i") }
    
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});



