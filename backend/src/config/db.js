const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://roopasushant_db_user:S%40143212@cluster0.3ab5dck.mongodb.net/smart-carrot?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn("WARNING: Running without database connection for testing purposes.");
    // process.exit(1); // Bypassing crash to test ESP32
  }
};

module.exports = connectDB;
