const router = require('express').Router();
const City = require('../model/city');
const { regex } = require('../regex');

router.route('/:cityname').get((req, res) => {
    let cityname = req.params.cityname.toLowerCase();
    console.log(regex(cityname));
    
    City.find()
        .then(city => res.status(200).json(city))
        .catch(err => res.status(400).json(err));
    // City.find({city: regex(cityname)})
    //     .then(citydata => {
    //         // console.log('Result: '+data)
    //         res.status(200).json(citydata);
    //     });
});

module.exports = router;