const db = require('mongoose');

db.connect(process.env.MONGO_DB_URL, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 60000, // 65 seconds
});

module.exports = db;
