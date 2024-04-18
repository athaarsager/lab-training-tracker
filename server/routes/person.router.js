const express = require("express");
const pool = require("../pool");
const router = express.Router();

// need: GET ALL, GET INDIVIDUAL, POST, UPDATE, DELETE

// GET ALL people (that are still at the institution)
router.get("/", async (req, res) => {
    try {
        const queryText = `
        SELECT * FROM "person" WHERE "has_left" = false;
        `;

        const result = await pool.query(queryText);
        res.send(result.rows);
    } catch (error) {
        console.log("ERROR in person GET ALL:", error);
        res.sendStatus(500);
    }
});

module.exports = router;