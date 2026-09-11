import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0,
    },
  },
});
const Session = mongoose.model("session", sessionSchema);
export default Session;
