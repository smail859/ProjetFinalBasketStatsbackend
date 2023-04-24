const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    default: true,
  },
});

const TrainingModel = mongoose.model("training", trainingSchema);

module.exports = TrainingModel;
