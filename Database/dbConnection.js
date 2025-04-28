<<<<<<< HEAD
const mongoose = require('mongoose');
const colors = require('colors');

// Get MongoDB URI from environment variable or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recspicy';

// Connection options with recommended settings
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
        // Retry logic for development environment
        if (process.env.NODE_ENV === 'development') {
            console.log('Retrying connection in 5 seconds...'.yellow);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDB();
        }
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;
=======
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recspicy';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, 
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
    family: 4 
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB; 
>>>>>>> 088e4bc57b5299788084a8bd1b5330d0213972cb
