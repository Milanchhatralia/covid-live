const mongoose = require('mongoose');

const onTerminate = () => {
    mongoose.connection.close(function(){
        console.log(termination("Mongo connection is disconnected due to application termination"));
        process.exit(0)
    });
}

mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, });

mongoose.connection.on('connected', () => {
    console.log("Mongo connection is open");
});

mongoose.connection.on('error', (err) => {
    console.log("Mongo connection has occured "+err+" error");
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongo connection is disconnected");
});

// Fire the Event On Application Stop/Termination
process.on('SIGINT', onTerminate).on('SIGTERM', onTerminate);

module.exports = mongoose