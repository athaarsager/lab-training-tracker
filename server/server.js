const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("build"));

// Route Includes
 const personRouter = require("./routes/person.router");

// Routes
app.use("/api/person", personRouter);

// Listen to Server and Port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});