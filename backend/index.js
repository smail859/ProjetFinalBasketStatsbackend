const express = require("express"); // Importer le module Express
const bodyParser = require("body-parser"); // Middleware pour parser le corps de la requête HTTP
const cookieParser = require("cookie-parser"); // Middleware pour parser les cookies
const userRoutes = require("./routes/user.routes");
const scoreRoutes = require("./routes/score.routes");
const trainingRoutes = require("./routes/training.routes");
const trainingRcmRoutes = require("./routes/trainingRcm.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware"); // Importer les middlewares pour vérifier l'authentification
const cors = require("cors"); // Middleware pour gérer les requêtes cross-domain

const app = express(); // Initialiser l'application Express

const corsOptions = {
  origin: process.env.CLIENT_URL, // Autoriser uniquement les requêtes venant de l'URL définie dans les variables d'environnement
  credentials: true, // Autoriser les cookies
  allowHeaders: ["sessionId", "Content-Type"], // Autoriser certains headers
  exposeHeaders: ["sessionId"], // Exposer certains headers
  method: "GET,HEAD,PUT,PATCH,POST,DELETE", // Autoriser les méthodes HTTP
  preflightContinue: false,
};

app.use(cors(corsOptions)); // Utiliser le middleware Cors
app.use(bodyParser.json()); // Parser les requêtes avec un body au format JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parser les requêtes avec un body en format x-www-form-urlencoded
app.use(cookieParser()); // Utiliser le middleware cookie-parser

// jwt
app.get("*", checkUser); // Middleware pour vérifier l'authentification sur toutes les routes
app.get("/jwtid", requireAuth, (req, res) => {
  // Route pour obtenir l'ID de l'utilisateur connecté
  res.status(200).send(res.locals.user._id);
});

// Utilisation des routes
app.use("/user", userRoutes);
app.use("/score", scoreRoutes);
app.use("/training", trainingRoutes);
app.use("/trainingRcm", trainingRcmRoutes);

// Demarrage du server
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
