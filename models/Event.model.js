const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const eventSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Motor development", "Social development", "Language development", "Sensory development", "Other"],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true, 
      default: Date.now
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000

    }, 
    // Add the option to add a picture??
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event
