import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import { hashedSession } from "../utils/sessionIdGenerator.js";

export const protect = async (req, res, next) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const sessionHash = await hashedSession(session);

    const decoded = await Session.findOne({
      sessionId: sessionHash,
    });

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error,
    });
  }
};

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
