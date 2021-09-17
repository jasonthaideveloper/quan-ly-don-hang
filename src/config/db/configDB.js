// import mongoose library
const mongoose = require('mongoose');

// Create function connect to DB
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/AMBO_dev');
        console.log('success');
    } catch (error) {
        console.log('fail');
    }
}

module.exports = { connect };