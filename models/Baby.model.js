const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const babySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }, 
    place: {
        type: String, 
        required: true
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Baby = model("Baby", babySchema);

module.exports = Baby
