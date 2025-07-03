import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: false },  // Use email as unique
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  verified: { type: Boolean, default: false },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;