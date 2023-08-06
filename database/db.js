const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://localhost:27017/energy", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;
