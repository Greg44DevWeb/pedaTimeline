const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const scenary = new mongoose.Schema(
  {
    moduleNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    period: {
      type: String,
      enum: ["1ère année", "2ème année", "3ème année", "1 AN"],
    },
    diploma: {
      type: String,
      required: true,
      enum: ["CAP", "BAC", "BP", "BTS MHR", "MCCDR"],
    },
    occupation: {
      type: String,
      required: true,
      enum: ["Cuisine", "Restaurant"],
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Scenary", scenary);
