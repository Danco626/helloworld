const express = require("express");
const http = require("http");
const logger = require("morgan");
const routes = require("./routes");
const webtask = require("webtask-tools");
const invalidRoute = require("./middleware/invalidRoute");
const errorHandler = require("./middleware/errorHandler");

const {
  devSetup,
  expressOIDCSDK,
} = require("./middleware/appStartupService");

let dotenv;
if (process.env.NODE_ENV === "local") {
  dotenv = require("dotenv").config();
}

const app = express();
app.use(devSetup);
app.set("view engine", "ejs");
app.set("trust proxy", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressOIDCSDK(false, false));


app.use("/", routes);

// Catch 404 and forward to error handler
app.use(invalidRoute);
app.use(errorHandler);

if (process.env.NODE_ENV === "local") {
  http.createServer(app).listen(process.env.PORT, async () => {
    console.log(`Listening on ${process.env.BASE_URL}`);
  });
}
module.exports = webtask.fromExpress(app);
