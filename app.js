const express = require("express");
const indexRouter = require("./routes/index");
const path = require("path");

const PORT = 3000;
const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// To get data from forms
app.use(express.urlencoded({ extended: true }));

// Add routes
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
