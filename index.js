const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require("./models/Book");
require("./services/passport");
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/bookRoutes")(app);

app.get("/", (req, res) => {
  res.send("Hi There!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
