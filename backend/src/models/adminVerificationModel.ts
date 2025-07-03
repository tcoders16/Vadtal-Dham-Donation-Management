import mongoose from "mongoose";

const AdminVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: false },
  otpCode: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

const AdminVerification = mongoose.model("AdminVerification", AdminVerificationSchema);

export default AdminVerification;