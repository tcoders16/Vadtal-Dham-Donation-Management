// File: src/controllers/adminController.ts

import { Request, Response } from "express";
import {
  registerAdminService,
  verifyAdminCodeService,
  loginAdminService,
} from "../service/loginService";

// Register Admin Controller (Step 1)
export async function registerAdminController(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
     res.status(400).json({
      message: "Email is required.",
    });
  }
``
  try {
    await registerAdminService(email);

    res.status(200).json({
      message: "OTP and temporary password have been sent to your email (for registration or password reset).",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Operation failed.",
    });
  }
}

// Verify OTP Controller (Step 2)
export async function verifyAdminCodeController(req: Request, res: Response) {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    res.status(400).json({
      message: "Email, code, and new password are required.",
    });
    return;
  }

  try {
    await verifyAdminCodeService(email, parseInt(code), newPassword);
    res.status(200).json({
      message: "Verification successful. Your password has been set. You can now log in.",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Verification failed.",
    });
  }
}

// Login Controller (Step 3)
export async function loginAdminController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required.",
    });
    return;
  }

  try {
    const token = await loginAdminService(email, password);

    res.status(200).json({
      message: "Login successful.",
      token: token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(401).json({
      message: error.message || "Login failed.",
    });
  }
}