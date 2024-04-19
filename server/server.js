const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

// Route Includes
const personRouter = require("./routes/person.router");
const trainingRouter = require("./routes/training.router");

 // express middleware
app.use(express.json());
app.use(express.static("build"));

// Routes
app.use("/api/person", personRouter);
app.use("/api/training", trainingRouter);

// Listen to Server and Port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});