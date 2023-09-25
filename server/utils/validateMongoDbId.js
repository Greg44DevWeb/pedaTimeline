const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("Cet Id n'est pas valide");
  }
};

module.exports = validateMongoDbId;
