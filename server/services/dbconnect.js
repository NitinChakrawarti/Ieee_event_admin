const mongoose = require('mongoose');
const dotenv = require('dotenv')
// const db_url = "mongodb+srv://nitincsbs:j7Gp3LnHm6Ddz0NL@nitin.z7qpz.mongodb.net/ieee"
dotenv.config({path: './config.env'});
const db_url = process.env.MONGODB_IEEE_DB;

const dbconnect = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 20000, 
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = dbconnect;