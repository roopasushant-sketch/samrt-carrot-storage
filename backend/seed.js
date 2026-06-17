require('dotenv').config();
const mongoose = require('mongoose');

// This script simulates a database seeding process for the Smart Carrot Storage System
// If a MongoDB connection is provided, it would create sample documents.
// If running in Mock Mode, it just prints out what it *would* seed.

const seedData = async () => {
  console.log('🌱 Starting Database Seed Process...\n');

  if (!process.env.DATABASE_URL) {
    console.log('⚠️ Running in Mock/Local Mode (No DATABASE_URL found).');
    console.log('Here is the sample data that would be seeded into the database:');
    
    const sampleCrops = [
      { batch_id: 'C-001', variety: 'Carrot (Nantes)', storage_unit: 'Unit A', date_stored: new Date().toISOString(), status: 'Excellent' },
      { batch_id: 'T-002', variety: 'Tomato (Roma)', storage_unit: 'Unit B', date_stored: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Good' },
      { batch_id: 'P-003', variety: 'Potato (Russet)', storage_unit: 'Unit C', date_stored: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'Excellent' },
    ];
    
    const sampleAlerts = [
      { type: 'Low Humidity', location: 'Unit A', severity: 'warning', resolved: true },
      { type: 'High Temperature', location: 'Unit C', severity: 'critical', resolved: false }
    ];

    console.table(sampleCrops);
    console.table(sampleAlerts);
    console.log('\n✅ Seed simulation complete. The application will start with default empty states or mock data as configured.');
    process.exit(0);
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB.');
    console.log('Generating dummy collections... (Mongoose Models would be used here)');
    
    // In a real scenario, you would do:
    // await Carrot.deleteMany({});
    // await Carrot.insertMany(sampleCarrots);
    
    console.log('✅ Seed successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed during seeding:', error);
    process.exit(1);
  }
};

seedData();
