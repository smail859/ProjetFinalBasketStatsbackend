const TrainingRcmModel = require("../models/trainingRcm.model");

module.exports.addTraining = async (req, res) => {
  const { title } = req.body;
  const newTrainingRcm = new TrainingRcmModel({ title });

  try {
    await newTrainingRcm.save();
    return res.status(201).send(title);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getTrainingRcm = async (req, res) => {
  TrainingRcmModel.find()
    .then((title) => {
      return res.status(200).send(title);
    })
    .catch((err) => {
      return res.status(400).send("Error to get data" + err);
    });
};
