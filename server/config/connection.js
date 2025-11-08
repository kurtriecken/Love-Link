const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lovelink";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

if (connectionString.startsWith('mongodb+srv://')) {
  mongooseOptions.ssl = true;
  mongooseOptions.tlsInsecure = false;
}

mongoose.connect(connectionString, mongooseOptions)

module.exports = mongoose.connection;
