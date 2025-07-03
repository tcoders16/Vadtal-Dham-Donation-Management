import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel";
import AdminVerification from "../models/adminVerificationModel";
import approvedAdminEmails from "../config/approvedAdmins";

/**
 * Send OTP and temporary password to the admin's email using Gmail App Password.
 *
 * Required .env:
 * - GMAIL_USER: your Gmail address
 * - GMAIL_APP_PASSWORD: your 16-character Gmail App Password
 */
export async function sendOtpEmail(
  recipientEmail: string,
  otp: number,
  tempPassword: string
) {
  // ✅ Use simple auth with App Password — no OAuth2 needed!
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email contents
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: "Your Admin Verification Code",
    text: `Your verification code is: ${otp}
    Temporary password: ${tempPassword}

  Please verify your account within 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// --------------------
// Service: Register admin → generates OTP + temp password
// --------------------
export async function registerAdminService(email: string) {
  if (!approvedAdminEmails.includes(email)) {
    throw new Error("This email is not approved to create an admin account.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const tempPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // ✅ Overwrite password and force verification for both cases
  await Admin.findOneAndUpdate(
    { email },
    {
      email,
      password: hashedPassword,
      verified: false, // Mark as unverified until they complete OTP
    },
    { upsert: true, new: true }
  );

  // ✅ Save new OTP record
  await AdminVerification.findOneAndUpdate(
    { email },
    {
      otpCode: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
    { upsert: true, new: true }
  );

  // ✅ Send OTP + temp password by email
  await sendOtpEmail(email, otp, tempPassword);

  return otp;
}

// --------------------
// Service: Verify OTP & set NEW password
// --------------------
export async function verifyAdminCodeService(
  email: string,
  code: number,
  newPassword: string
) {
  const record = await AdminVerification.findOne({ email });
  if (!record) {
    throw new Error("No verification code found. Please register again.");
  }

  if (record.otpCode !== code) {
    throw new Error("Invalid verification code.");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("Verification code expired. Please register again.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Admin.findOneAndUpdate(
    { email },
    {
      verified: true,
      password: hashedPassword,
    }
  );

  await AdminVerification.deleteOne({ email });
}

// --------------------
// Service: Login verified admin
// --------------------
export async function loginAdminService(email: string, password: string) {
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new Error("Admin not found.");
  }

  if (!user.verified) {
    throw new Error("Email not verified. Please complete verification first.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign(
    { id: user._id, role: "admin" },
    process.env.JWT_SECRET || "YOUR_SECRET",
    { expiresIn: "1h" }
  );

  return { email: user.email, role: user.role, token };
}