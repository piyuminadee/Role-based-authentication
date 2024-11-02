const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        console.log('MongoDB Connection String:', process.env.CONNECTION_STRING);
        
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log connection details
        console.log(
            `Database connected: Host - ${connect.connection.host}, Database - ${connect.connection.name}`
        );
    } catch (err) {
        // Log the error and exit the process
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = dbConnect;