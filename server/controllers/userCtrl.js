const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { updateClassRoom } = require("./schoolClassCtrl");

//** REGISTER
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    //Create a new user
    const newUser = await User.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Nouvel utilisateur crée", newUser });
  } else {
    // User already exists
    throw new Error("Utilisateur déjà existant");
  }
});

//** LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Chef if user exists or not
  try {
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = generateRefreshToken(findUser?._id);
      const updateTokenUser = await User.findById(
        findUser?._id,
        { refreshToken: refreshToken },

        { new: true }
      );
      res.cookie("refreshToken", updateTokenUser.refreshToken, {
        // httpOnly: true,
        // path: "/",

        // sameSite: "None",
        maxAge: 72 * 60 * 60 * 1000,
      });
      // console.log(req.cookie["refreshToken"]);

      res.status(200).json({
        success: true,
        message: "Vous êtes connecté.e",
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        role: findUser?.role,
        job: findUser?.job,
        token: generateToken(findUser?._id),
      });
    }
  } catch (error) {
    throw new Error("Identifiants invalides", error);
  }
});

//**LOGOUT
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("Pas de Token");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(204); // FORBIDDEN
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204); // FORBIDDEN
});

//**Handle Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("Pas de 'Refresh Token' dans les cookies");
  }
  const refreshToken = cookie.refreshToken;
  console.log("refreshToken: ", refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("Ressource 'Refresh Token' introuvable");
  }
  jwt.verify(
    refreshToken,
    process.env.SECRET_KEY,
    (err,
    (decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("Une erreur s'est produite avec le 'Refresh Token'");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    })
  );
});
//**UPDATE A SINGLE USER
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        role: req.body?.role,
        job: req.body?.job,
        isBlocked: req.body?.isBlocked,
      },
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Informations mises à jour",
      updatedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//**ASSIGN CLASSROOM TO USER */
const assignClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classroom = req.body.id;
  validateMongoDbId(id);
  try {
    const assignedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: { schoolClass: classroom },
      },
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Classe assignée",
      assignedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//**REMOVE CLASSROOM TO USER */
const removeClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classroom = req.body.id;
  validateMongoDbId(id);
  try {
    const assignedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: { schoolClass: classroom },
      },
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Cette classe n'est plus assignée",
      assignedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// GET ALL USERS EXCEPTED PASSWORDS
const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()
      .populate("schoolClass")
      .select("-password");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//GET SINGLE USER EXCEPTED PASSWORD
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id)
      .populate("schoolClass")
      .select("-password");
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});
// BLOCK SINGLE USER
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.status(200).json({ message: "utilisateur bloqué" });
  } catch (error) {
    throw new Error(error);
  }
});
// UNBLOCK SINGLE USER
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.status(200).json({ message: "utilisateur débloqué" });
  } catch (error) {
    throw new Error(error);
  }
});
//DELETE A SINGLE USER
const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `L'Utilisateur a été supprimé`,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  handleRefreshToken,
  logout,
  updateUser,
  getallUsers,
  getSingleUser,
  blockUser,
  unblockUser,
  deleteSingleUser,
  assignClassroom,
  removeClassroom,
};
