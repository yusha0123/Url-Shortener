const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDb = require("./utils/dbconnect");
const errorHandler = require("./middleware/error");
const viewsHandler = require("./routes/views");
require("dotenv").config();

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.FRONT_END_URL,
    })
  );
}
app.use(express.static(path.join(__dirname, "dist")));
connectDb();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tinylink", require("./routes/tinyLink"));
app.use(viewsHandler);
app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err}`);
});

app.listen(port, () => console.log(`Server running on port : ${port}`));
