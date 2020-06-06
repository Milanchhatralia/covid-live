const router = require('express').Router();
const State = require('../model/state');
const { customRegex, regex } = require('../regex');

router.route('/:statename').get((req, res) => {
    let region = req.params.statename.toLowerCase();
    State.find({
        $or: [
            { state: regex(region) },
            { county: customRegex(region, 'county') }
        ]
    }).then(data => {
        res.status(200).json(data)
    }) 
});

router.route('/code/:statecode').get((req, res) => {
    let regioncode = req.params.statecode.toLowerCase();
    State.find({
        $or: [
            { statecode: regex(regioncode) },
            { countycode: regex(regioncode) }
        ]
    }).then(data => {
        res.status(200).json(data)
    })
});

module.exports = router;