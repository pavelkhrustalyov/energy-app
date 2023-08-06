const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB, {
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
