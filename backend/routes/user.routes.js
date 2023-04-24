// Importe le router d'express
const router = require("express").Router();

// Appeler la fonction user.controller
const userController = require("../controllers/user.controller");

// Appeler la fonction auth.controller
const authController = require("../controllers/auth.controller");

// Cree un utilisateur, Authentification
router.post("/register", authController.signUp);

// Connecter l'utilisateur
router.post("/login", authController.signIn);

// Deconnecter l'utilisateur
router.get("/logout", authController.logout);

// routes utilisateur
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Le router est disponible dans toute l'appli
module.exports = router;
