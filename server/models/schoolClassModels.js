const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var schoolClass = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // diploma: {
    //   type: String,
    //   enum: ["CAP", "BAC", "BP", "BTS", "MENTION COMPLEMENTAIRE"],
    // },
    // typeJob: {
    //   type: String,
    //   enum: [
    //     "Cuisine",
    //     "Service et commercialisation",
    //     "Arts culinaires",
    //     "Arts du Service et de la commercialisation",
    //     "MHR OPTION A",
    //     "MHR OPTION B",
    //     "Desserts de restaurant",
    //   ],
    // },
    // period: {
    //   type: String,
    //   enum: ["1ère année", "2ème année", "3ème année", "1 AN"],
    // },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("SchoolClass", schoolClass);
