const pg = require("pg");
let pool;

// Determines if we are using a deployed database or localhost
// When running on local computer, will just use local postgres database
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    pool = new pg.Pool({
        host: "localhost",
        port: 5432,
        database: "lab_training_tracker"
    });
}

module.exports = pool;