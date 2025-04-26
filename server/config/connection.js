const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lovelink",
  {
    ssl: true, // make sure SSL/TLS is used
    tlsInsecure: false, // ensure secure TLS connection (optional, usually default)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
