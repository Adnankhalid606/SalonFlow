import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    panel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "panel",
    },
  },
  {
    timestamps: true,
  },
);
const service = mongoose.model("service", serviceSchema);
export default service;