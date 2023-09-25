const express = require("express");
const {
  createUser,
  login,
  getallUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  classRoomAssignation,
  assignClassroom,
  removeClassroom,
  //updatePassword
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", createUser); // /api/user/register
router.post("/login", login); // /api/user/login
router.get("/logout", logout); // /api/user/logout
router.put("/update/edit-user/:id", authMiddleware, isAdmin, updateUser); // api/user/update/edit-user/
// router.put("/password", authMiddleware, updatePassword); // /api/user/password
router.get("/all-users", authMiddleware, isAdmin, getallUsers); // api/user/all-users
router.get("/userId/:id", authMiddleware, isAdmin, getSingleUser); // api/user/userId/id
router.delete("/admin/userId/:id", authMiddleware, isAdmin, deleteSingleUser); // api/user/admin/userId/id
router.put("/update/block-user/:id", authMiddleware, isAdmin, blockUser); // api/user/update/block-user/id
router.put("/update/unblock-user/:id", authMiddleware, isAdmin, unblockUser); // api/user/update/unblock-user/id
router.put("/refreshtoken", authMiddleware, isAdmin, handleRefreshToken); // api/user/refreshtoken
//**CLASSROOM ASSIGNATION */
router.patch("/assign/edit-user/:id", authMiddleware, isAdmin, assignClassroom); // api/user/assign/edit-user/
router.put("/remove/edit-user/:id", authMiddleware, isAdmin, removeClassroom); // api/user/remove/edit-user/
module.exports = router;
