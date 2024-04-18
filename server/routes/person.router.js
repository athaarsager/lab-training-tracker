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

// GET individual person for viewing training details
router.get("/:id", async (req, res) => {
    try {
        // store person's id in url and pass as action.payload
        const personId = req.params.id;
        const queryText = `
        SELECT * from "person" WHERE "id" = $1;
        `;
        const result = await pool.query(queryText, [personId]);
        res.send(result.rows);
    } catch (error) {
        console.log("ERROR in individual person GET:", error);
        res.sendStatus(500);
    }
});

// POST new person
router.post("/", async (req, res) => {
    try {
        // req.body will be all the person's info
        const newPerson = req.body;
        const queryText = `
        INSERT INTO "person" ("first_name", "last_name", "email", "is_instructor")
        VALUES ($1, $2, $3, $4);
        `;
        await pool.query(queryText, [newPerson.first_name, newPerson.last_name, newPerson.email, newPerson.is_instructor]);
        res.sendStatus(201);
    } catch (error) {
        console.log("ERROR in new person POST:", error);
        res.sendStatus(500);
    }
});

module.exports = router;