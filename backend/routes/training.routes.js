const express = require("express");
const router = express.Router();
const TrainingModel = require("../models/training.model");

const defaultTrainings = [
  {
    title: "Tir à 2 Points",
  },
  {
    title: "Tir à 3 Points",
  },
  {
    title: "LayUp MG",
  },
  {
    title: "LayUp MD",
  },
  {
    title: "Lancer Franc",
  },
];

router.get("/", async (req, res) => {
  try {
    const trainings = await TrainingModel.find({});
    if (trainings.length === 0) {
      await TrainingModel.insertMany(defaultTrainings);
      res.status(200).send(defaultTrainings);
    } else {
      res
        .status(200)
        .json({ message: "Trainings already exist in the database." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
