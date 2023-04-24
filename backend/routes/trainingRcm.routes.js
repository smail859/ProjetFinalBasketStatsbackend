const express = require("express");
const router = express.Router();
const trainingRcmController = require("../controllers/trainingRcm.controller");

router.post("/", trainingRcmController.addTraining);
router.get("/", trainingRcmController.getTrainingRcm);

module.exports = router;
