const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/auth");
const {
  scenaryCreate,
  updatedScenary,
  getallScenaries,
  deleteScenary,
} = require("../controllers/moduleCtrl");
const router = express.Router();

router.post("/create-module", scenaryCreate); // api/module/create-module
router.put("/update/:id", updatedScenary); // api/module/update/:id
router.get("/all-modules", getallScenaries); // api/module/all-modules
router.delete("/delete/:id", deleteScenary); // api/module/delete/:id
module.exports = router;
