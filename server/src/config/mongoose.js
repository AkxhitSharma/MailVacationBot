const mongoose = require('mongoose');
const { MONGODB_URI } = require('./var');


mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

exports.connectDB = () => {
    mongoose
        .connect(MONGODB_URI)
        .then(() => console.log('.....mongoDB connected.....'));
    return mongoose.connection;
};