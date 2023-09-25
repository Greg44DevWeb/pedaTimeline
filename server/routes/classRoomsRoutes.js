const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/auth");
const {
  createClassRoom,
  updateClassRoom,
  getOneClassRoom,
  deleteClassRoom,
  getallClassRooms,
} = require("../controllers/schoolClassCtrl");
const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createClassRoom); // /api/classroom/create
// api/classromm/update/edit-classroom/
router.put(
  "/update/edit-classroom/:id",
  authMiddleware,
  isAdmin,
  updateClassRoom
);
//
router.get("/all-classrooms", authMiddleware, isAdmin, getallClassRooms); // api/classroom/all-classrooms
router.get("/classroomId/:id", authMiddleware, isAdmin, getOneClassRoom); // api/classromm/classrommId/id
router.delete("/classroomId/:id", authMiddleware, isAdmin, deleteClassRoom); // api/classroom/classroomId/id

module.exports = router;
