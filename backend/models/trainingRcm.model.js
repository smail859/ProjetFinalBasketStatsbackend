const mongoose = require("mongoose");

const trainingRcmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const TrainingRcmModel = mongoose.model("trainingRcm", trainingRcmSchema);

module.exports = TrainingRcmModel;
