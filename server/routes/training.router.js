const express = require("express");
const pool = require("../pool");
const router = express.Router();

// GET all trainings a specific person has done
router.get("/:id", async (req, res) => {
    try {
        // req.params.id will be the id of the person clicked on
        const queryText = `
        
        `;
    } catch (error) {
        console.log("ERROR in getting all trainings for a specific person:", error);
        res.sendStatus(500);
    }
});

// POST new training (in case new curriculum added or regulations change, etc.)
// POST new entry to person_training table if they have completed a training
// Update training name?
// DELETE a training if outdated?

module.exports = router;