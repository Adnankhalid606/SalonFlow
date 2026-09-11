import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    panel_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "panel"
    }
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);
export default User;