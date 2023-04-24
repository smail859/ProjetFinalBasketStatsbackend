const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// Middleware pour vérifier l'utilisateur
module.exports.checkUser = (req, res, next) => {
  // Récupérer le token du cookie
  const token = req.cookies.jwt;
  if (token) {
    // Vérifier le token en utilisant la clé secrète
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // Si il y a une erreur, l'utilisateur est null
        res.locals.user = null;
        next();
      } else {
        // Si le token est valide, on récupère l'utilisateur correspondant à l'id stocké dans le token
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    // Si il n'y a pas de token, l'utilisateur est null
    res.locals.user = null;
    next();
  }
};

// Middleware pour exiger l'authentification
module.exports.requireAuth = (req, res, next) => {
  // Récupérer le token du cookie
  const token = req.cookies.jwt;
  if (token) {
    // Vérifier le token en utilisant la clé secrète
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // Si il y a une erreur, renvoyer une réponse d'erreur
        console.log(err);
        res.status(401).json("no token");
      } else {
        // Si le token est valide, passer à la fonction suivante
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    // Si il n'y a pas de token, renvoyer une réponse d'erreur
    console.log("No token");
  }
};
