const express = require("express");
const connectDb = require("./config/dbconnect");
const errorHandler = require("./middleware/error");
const viewsHandler = require("./routes/views");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "../client", "dist")));
connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tinylink", require("./routes/tinyLink"));
app.use(viewsHandler);
app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err}`);
});

app.listen(port, () => console.log(`Server running on port : ${port}`));
