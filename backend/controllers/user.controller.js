const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

// Récupérer tous les utilisateurs (sans leurs mots de passe)
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); // Récupérer tous les utilisateurs et exclure le champ password
  res.status(200).json(users); // Renvoyer les utilisateurs en tant que réponse JSON
};

// Récupérer les informations d'un utilisateur spécifique en fonction de son ID
module.exports.userInfo = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    // Utiliser la méthode isValidObjectId de Mongoose pour vérifier que l'ID est valide
    return res.status(400).send("ID unknown : " + req.params.id); // Renvoyer une erreur si l'ID est invalide
  }
  UserModel.findById(req.params.id)
    .select("-password")
    .then((user) => {
      if (user) {
        res.send(user); // Renvoyer les informations de l'utilisateur en tant que réponse JSON
      } else {
        res.status(404).send("User not found"); // Renvoyer une erreur si l'utilisateur n'est pas trouvé
      }
    })
    .catch((err) => {
      console.log(err); // Afficher l'erreur si elle se produit
      res.status(500).send("Server error"); // Renvoyer une erreur si une erreur interne du serveur se produit
    });
};

// Mettre à jour les informations d'un utilisateur spécifique en fonction de son ID
module.exports.updateUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    // Vérifier que l'ID est valide
    return res.status(400).send("ID invalid : " + req.params.id); // Renvoyer une erreur si l'ID est invalide

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          stats: req.body.stats, // Mettre à jour les informations de l'utilisateur avec les données fournies dans le corps de la requête
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true } // Options pour la mise à jour
    )
      .then((docs) => res.send(docs)) // Renvoyer les informations mises à jour de l'utilisateur en tant que réponse JSON
      .catch((err) => res.status(500).send({ message: err })); // Afficher une erreur si la mise à jour échoue
  } catch (err) {
    res.status(500).json({ message: err }); // Afficher une erreur si une autre erreur se produit
  }
};

// Supprimer un Utilisateur
module.exports.deleteUser = async (req, res) => {
  // Vérifier que l'utilisateur est connu
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id); // Renvoyer une erreur si l'ID est invalide
  }
  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec(); // Supprimer l'utilisateur en fonction de son ID
    res.status(200).json({ message: "Successfully deleted" }); // Renvoyer un message de succès
  } catch (err) {
    return res.status(500).json({ message: err }); // Afficher une erreur si la suppression échoue
  }
};
