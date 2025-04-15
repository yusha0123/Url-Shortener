const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDb = require("./utils/dbconnect");
const errorHandler = require("./middlewares/error");
const viewsHandler = require("./routes/views");
require("dotenv").config();
const os = require("os");

const app = express();
const port = process.env.PORT || 8080;
const protocol = process.env.PROTOCOL || (process.env.NODE_ENV === "production" ? "https" : "http");

const getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    const validInterface = iface.find(config => config.family === "IPv4" && !config.internal);
    if (validInterface) return validInterface.address;
  }
  return "localhost";
};

const initializeServer = async () => {
  try {
    await connectDb();

    console.log("\x1b[32m✅ DB Connected! Server is starting...\x1b[0m");

    app.use(express.static(path.join(__dirname, "dist")));

    if (process.env.NODE_ENV !== "production") {
      app.use(cors({ origin: process.env.FRONT_END_URL }));
    }

    app.use(express.json());
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/link", require("./routes/link"));
    app.use(viewsHandler);
    app.use(errorHandler);

    const server = app.listen(port, () => {
      const local = `${protocol}://localhost:${port}`;
      const network = `${protocol}://${getNetworkAddress()}:${port}`;
      console.log(`\x1b[32m✅ Server is running:\x1b[0m\n→ Local:    ${local}\n→ Network:  ${network}`);
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Process terminated");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("\x1b[31m❌ DB Connection failed! Exiting...\x1b[0m", error.message);
    process.exit(1);
  }
};

initializeServer();