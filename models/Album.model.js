const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of baby is required"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"]
    }, 
    place: {
        type: String, 
        required: [true, "Place of baby is required"]
    }, 
    // time: {
    //     is this going to be necessary, or is the dateOfBirth enough?
    // }
   length: {
    type: Number,
    min: 0
   },
   weight: {
    type: Number,
    min: 0
   },
   imageURL: {
    type: String,
   },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Album = model("Album", albumSchema);

module.exports = Album
