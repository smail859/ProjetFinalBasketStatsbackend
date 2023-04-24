const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signInErrors, signUpErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // Durée de validité du token, ici 3 jours en millisecondes

// Fonction pour créer un token d'authentification en utilisant l'id de l'utilisateur
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// Fonction pour s'inscrire en tant qu'utilisateur
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body; // Récupère les informations de l'utilisateur à partir du corps de la requête

  try {
    const user = await UserModel.create({ pseudo, email, password }); // Crée un nouvel utilisateur dans la base de données à partir des informations reçues
    res.status(201).json({ user: user._id }); // Renvoie une réponse avec le code HTTP 201 (créé avec succès) et l'id de l'utilisateur nouvellement créé
  } catch (err) {
    const errors = signUpErrors(err); // Génère un objet d'erreur à partir de l'erreur renvoyée
    res.status(400).send({ errors }); // Renvoie une réponse avec le code HTTP 200 (OK) et l'objet d'erreur
  }
};

// Fonction pour se connecter en tant qu'utilisateur
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

// Fonction pour se déconnecter en tant qu'utilisateur
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send("Logged out successfully");
};
