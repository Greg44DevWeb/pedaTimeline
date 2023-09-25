const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Non autorisé, token expiré, reconnectez-vous.");
    }
  } else {
    throw new Error("Il n'y a pas de token valide.");
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("Vous n'avez pas les droits d'accés pour cette action...");
  } else {
    next();
  }
});
const isEditor = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "editor" && adminUser.role !== "admin") {
    throw new Error("Vous n'avez pas les droits d'accés pour cette action...");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin, isEditor };
