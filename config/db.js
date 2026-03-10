const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI.trim();

    await mongoose.connect(uri, {
      dbName: "habitsDB",
    });

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

