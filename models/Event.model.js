const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const eventSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Motor development", "Social development", "Language development", "Sensory development", "Other"],
      required: [true, "Category is required"]
    },
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: 1000
    }, 
    // Add the option to add a picture??
    albumID: {
      type: String,
      required: [true, "albumID is required"]
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

const Event = model("Event", eventSchema);

module.exports = Event
