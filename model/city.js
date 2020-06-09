const mongoose = require('../connection/atlasConnect');

var CitySchema = mongoose.Schema({
  city: { type: String},
  notes: { type: String},
  active: {type: Number},
  confirmed: {type: Number},
  deaths: { type: Number},
  recovered: { type: Number},
  delta: { 
    type: Object,
    confirmed: { type: Number },
    deceased: { type: Number },
    recovered: { type: Number }
  },
  statecode: { type: String },
  state: { type: String },
  resources: {type: Object}
});

module.exports = mongoose.model('City', CitySchema);