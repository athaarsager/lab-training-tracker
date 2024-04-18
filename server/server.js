const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("build"));

// Routes

// Listen to Server and Port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});