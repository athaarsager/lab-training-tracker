const express = require("express");
const pool = require("../pool");
const router = express.Router();

// GET all trainings a specific person has done
router.get("/:id", async (req, res) => {
    try {
        // req.params.id will be the id of the person clicked on
        const queryText = `
        SELECT "person_id", "training_id", "title", "short_title", "validation_length", "date_taken" FROM "training"
        JOIN "person_training" ON "training_id" = "training"."id"
        WHERE "person_id" = $1;
        `;
        const result = await pool.query(queryText, [req.params.id]);
        res.send(result.rows);
    } catch (error) {
        console.log("ERROR in getting all trainings for a specific person:", error);
        res.sendStatus(500);
    }
});

// POST new training (in case new curriculum added or regulations change, etc.)
router.post("/", async (req, res) => {
    try {
        // req.body will be an object with all the info needed for a new training
        const queryText = `
        INSERT INTO "training" ("title", "short_title", "validation_length")
        VALUES ($1, $2, $3);
        `;
        await pool.query(queryText, [req.body.title, req.body.short_title, req.body.validation_length]);
        res.sendStatus(201);
    } catch (error) {
        console.log("ERROR in new training POST:", error);
        res.sendStatus(500);
    }
});

// POST new entry to person_training table if they have completed a training for the first time
router.post("/:id", async (req, res) => {
    try {
        // just store the training id in req.body. 
        // store person's id in req.params
        // going to assume power user is notified immediately when a person completes a training
        // so there won't be a date picker for choosing the date. Will default to date when records are updated
        const personId = req.params.id;
        const trainingId = req.body.id;
        const queryText =  `
        INSERT INTO "person_training" ("person_id", "training_id")
        VALUES ($1, $2);
        `;
        await pool.query(queryText, [personId, trainingId]);
        res.sendStatus(201);
    } catch (error) {
        console.log("ERROR in posting new data to person_training:", error);
        res.sendStatus(500);
    }
});
// Update training date_taken whenever someone re-takes a training
// Update training name?
// DELETE a training if outdated?

module.exports = router;