const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://dbUser1:TugasPWA1@cluster0-shard-00-00.c2zet.mongodb.net:27017,cluster0-shard-00-01.c2zet.mongodb.net:27017,cluster0-shard-00-02.c2zet.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-68nqrx-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
