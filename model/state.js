const mongoose = require('../connection/atlasConnect');

var StateSchema = new mongoose.Schema({
    _id: Object,
    active: String,
    confirmed: String,
    deaths: String,
    deltaconfirmed: String,
    deltadeaths: String,
    deltarecovered: String,
    lastupdatedtime: String,
    migratedother: String,
    recovered: String,
    state: String,
    statecode: String,
    statenotes: String,
    resources: Object
});

module.exports = mongoose.model('state-main', StateSchema );