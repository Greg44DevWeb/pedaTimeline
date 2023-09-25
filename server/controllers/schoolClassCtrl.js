const ClassRoom = require("../models/schoolClassModels");
const User = require("../models/menusModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongoDbId");

//**CREATE CLASSROOM */
const createClassRoom = asyncHandler(async (req, res) => {
  try {
    const findTitle = await ClassRoom.findOne({ title });
    if (!findTitle) {
      req.body.slug = slugify(req.body.title);
    } else {
      throw new Error("Classe déjà existante");
    }
    const newClassRoom = await ClassRoom.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Classe ajoutée", newClassRoom });
  } catch (error) {
    throw new Error(error);
  }
});

//**UPDATE CLASSROOM */
const updateClassRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const title = req.body.title;
    if (title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedClassRoom = await ClassRoom.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Nom de la classe modifié",
      updatedClassRoom,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//**DELETE CLASSROOM */
const deleteClassRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedClassRoom = await ClassRoom.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Classe supprimée" });
  } catch (error) {
    throw new Error(error);
  }
});
//**GET ONE SINGLE CLASSROOM
const getOneClassRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const singleClassRoom = await ClassRoom.findById(id);
    res.status(200).json({ success: true, singleClassRoom });
  } catch (error) {
    throw new Error(error);
  }
});
//**GET ALL CLASSROOMS */
const getallClassRooms = asyncHandler(async (req, res) => {
  try {
    const getClassRooms = await ClassRoom.find();
    res.json(getClassRooms);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createClassRoom,
  updateClassRoom,
  deleteClassRoom,
  getOneClassRoom,
  getallClassRooms,
};
