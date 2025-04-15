const mongoose = require("mongoose");

const connectDb = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      return;
    } catch (error) {
      console.error("\x1b[31m❌ DB Connection failed! Retrying...\x1b[0m", error.message);
      retries -= 1;
      if (retries === 0) {
        console.error("\x1b[31m❌ DB Connection failed after multiple attempts\x1b[0m");
        process.exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

module.exports = connectDb;
