const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var menu = new mongoose.Schema(
  {
    theme: {
      type: String,
      required: false,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "SchoolClass",
    },
    team: {
      Type: String,
      enum: ["Groupe A", "Groupe B", "Groupe C"],
    },
    // module: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Scenary",
    //   },
    // ],
    // week: {
    //   type: Date,
    //   required: true,
    // },
    // required: true,
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    // },
    // productionZone: {
    //   type: String,
    //   Required: true,
    //   Enum: ["Cuisine", "Restaurant", "Pâtisserie", ],
    // },
    // serviceType: {
    //   type: String,
    //   enum: [
    //     "Restaurant",
    //     "Cantine",
    //     "Brasserie",
    //     "Prestation",
    //     "Atelier Expérimental",
    //     "TA",
    //     "TP",
    //     "TP supplémentaire",
    //     "Examen Blanc",
    //     "CCF",
    //     "Pas de production",
    //     "Vente à emporter",
    //     "Examen"
    //   ],
    //   required: true,
    // },
    // serviceTime: {
    //   type: String,
    //   Required: true,
    //   enum: ["Midi", "Soir"],
    // },
    ab: {
      type: String,
      required: false,
    },
    starter: {
      type: String,
      required: false,
    },
    main: {
      type: String,
      required: false,
    },
    dessert: {
      type: String,
      required: false,
    },
    cheese: {
      type: String,
      required: false,
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isValidate: {
      type: Boolean,
    },
    // predictedDate: {
    //   type: String,
    //   require: true,
    //   default: Date.now.toLocaleString,
    // },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Menu", menu);
