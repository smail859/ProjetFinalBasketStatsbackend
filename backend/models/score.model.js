const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    month: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 255,
    },
    scoreUn: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    scoreDeux: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

const ScoreModel = mongoose.model("score", scoreSchema);

module.exports = ScoreModel;
