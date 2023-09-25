const Scenary = require("../models/scenaryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

//** GENERATE MODULE */
const scenaryCreate = asyncHandler(async (req, res) => {
  const { moduleNumber, title, period, classroom, diploma, occupation } =
    req.body;
  try {
    const findScenary = await Scenary.findOne({ title });
    if (!findScenary) {
      const newScenary = await Scenary.create(req.body);
      res
        .status(200)
        .json({ success: true, message: "Le module est généré", newScenary });
    } else {
      throw new Error("Ce module existe déjà");
    }
  } catch (error) {
    throw new Error(error);
  }
});
//**UPDATE MODULE */
const updatedScenary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedScenaryData = req.body;

    const updatedScenary = await Scenary.findByIdAndUpdate(
      id,
      updatedScenaryData,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Le module à été modifié",
      updatedScenary,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// GET ALL MODULES BY DIPLOMA, PERIOD, OCCUPATION
const getallScenaries = asyncHandler(async (req, res) => {
  try {
    const diploma = req.body.diploma;
    const period = req.body.period;
    const occupation = req.body.occupation;
    const getScenaries = await Scenary.find({ diploma, period, occupation });
    if (diploma === "" || period === "" || occupation === "") {
      throw new Error("Aucune donnée trouvée !");
    }
    res.json(getScenaries);
  } catch (error) {
    throw new Error(error);
  }
});
//**DELETE MODULE */
const deleteScenary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedScenary = await Scenary.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Module supprimé" });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  scenaryCreate,
  updatedScenary,
  getallScenaries,
  deleteScenary,
};
