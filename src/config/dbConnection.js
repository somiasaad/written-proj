const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log("connect to database");
    } catch (error) {
        console.error("error to connect database");
    }
};

module.exports = dbConnection;
