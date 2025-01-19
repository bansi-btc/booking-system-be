import { Request, Response } from "express";
const authenticator = require("authenticator");

const express = require("express");

const router = express.Router();

router.post("/user/signup", (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const totp = authenticator.generateToken(phoneNumber + "SIGNUP");

    return res.status(200).json({
      success: true,
      otp: totp,
      message: "Otp sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: 500,
      message: "Internal server error",
    });
  }
});

router.post("/user/signup/verify", (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;

    const isOTPCorrect = authenticator.verifyToken(phoneNumber + "SIGNUP", otp);

    if (!isOTPCorrect) {
      return res.status(200).json({
        success: false,
        message: "OTP is incorrect",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
