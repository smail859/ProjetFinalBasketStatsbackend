const ScoreModel = require("../models/score.model");

module.exports.getAllScores = (req, res) => {
  ScoreModel.find()
    .sort({ createdAt: -1 })
    .then((score) => {
      return res.status(200).send(score);
    })
    .catch((err) => {
      return res.status(400).send("Error to get data" + err);
    });
};

module.exports.getScoresByTitle = async (req, res) => {
  const title = req.params.trainingName;
  try {
    const scores = await ScoreModel.find({ title: title });
    return res.status(200).json(scores);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.addScores = async (req, res) => {
  const month = new Date(req.body.month);
  if (isNaN(month.getTime())) {
    return res.status(400).json({ message: "Invalid month" });
  }
  const newScore = new ScoreModel({
    month,
    title: req.body.title,
    scoreUn: req.body.scoreUn,
    scoreDeux: req.body.scoreDeux,
  });

  try {
    const scores = await newScore.save();
    return res.status(201).json(scores);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
