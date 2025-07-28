const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection options (removed unsupported buffer options)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
      // Removed: bufferCommands: false
      // Removed: bufferMaxEntries: 0
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📴 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // Retry connection after 5 seconds
    console.log('🔄 Retrying database connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Database health check
const checkDatabaseHealth = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return {
      status: 'healthy',
      message: 'Database connection is active'
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error.message
    };
  }
};

module.exports = {
  connectDB,
  checkDatabaseHealth
};
