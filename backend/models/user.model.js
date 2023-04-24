const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
// Schema d'utilisateur
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true, // Le pseudo doit être unique
      trim: true, // Supprime les espaces au début et à la fin de la chaîne
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], // La validation est effectuée à l'aide de la fonction isEmail de Validator
      lowercase: true, // L'adresse email est mise en minuscules
      unique: true, // L'adresse email doit être unique
      trim: true, // Supprime les espaces au début et à la fin de la chaîne
    },
    password: {
      type: String,
      required: true,
      max: 1024, // La longueur maximale du mot de passe est de 1024 caractères
      minlength: 8, // La longueur minimale du mot de passe est de 6 caractères
    },
  },
  {
    timestamps: true, // Cette option crée automatiquement deux champs : createdAt et updatedAt
  }
);

// Hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Vérifier les informations d'identification de l'utilisateur lorsqu'il se connecte
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Email incorrect");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
