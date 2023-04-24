const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/score.controller");

router.get("/", scoreController.getAllScores);
router.get("/:title", scoreController.getScoresByTitle);
router.post("/", scoreController.addScores);

module.exports = router;
