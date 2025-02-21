const express = require("express");
const connectDB = require("./config/databases");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "https://dev-connect-web-wine.vercel.app/login",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database cannot  be Connected");
  });

  module.exports = app;
  module.exports.handler = serverless(app);