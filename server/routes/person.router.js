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

// Update person's info (PUT)
router.put("/:id", async (req, res) => {
    try {
        // req.params.id will be person's id
        // updated info will auto-fill on front end with current info so all values are present when sent to back end
        const updatedInfo = req.body;
        const queryText = `
        UPDATE "person" SET "first_name" = $1, "last_name" = $2, "email" = $3, "is_instructor" = $4
        WHERE "id" = $5;
        `;
        await pool.query(queryText, [updatedInfo.first_name, updatedInfo.last_name, updatedInfo.email, updatedInfo.is_instructor, req.params.id]);
        res.sendStatus(200);
    } catch (error) {
        console.log("ERROR in person PUT:", error);
        res.sendStatus(500);
    }
});

// DELETE a person from the system (soft delete--simply mark them as "has_left")
router.put("/delete/:id", async (req, res) => {
    try {
        // req.params will be person's id
        // don't need other info as this will simply be a delete button on the front end
        const queryText = `
        UPDATE "person" SET "has_left" = true
        WHERE "id" = $1;
        `;
        await pool.query(queryText, [req.params.id]);
        res.sendStatus(200);
    } catch (error) {
        console.log("ERROR in person soft delete:", error);
        res.sendStatus(500);
    }
});

module.exports = router;