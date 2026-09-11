import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateSession, hashedSession } from "../utils/sessionIdGenerator.js";
import Session from "../models/sessionModel.js";
import Panel from "../models/panelModel.js";
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const panel = await Panel.create({
      name: `${name}'s-panel`,
    });
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      panel_id: panel._id
    });
    res.status(201).json({
      status: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect." });
    }
    const session_id = await generateSession();
    const hashedSession_id = await hashedSession(session_id);
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await Session.create({
      sessionId: hashedSession_id,
      userId: user._id,
      expiresAt
    })
    res.cookie("session", session_id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2* 60 * 60 * 1000, //2 Hours
    });
    res.status(200).json({
      status: true,
      message: "User logged in successfully.",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      status: true,
      message: "User logged out successfully.",
    });
  } catch (err) {
    next(err);
  }
};
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      data: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        panel_id: req.user.panel_id,
      },
    });
  } catch (err) {
    next(err);
  }
};
