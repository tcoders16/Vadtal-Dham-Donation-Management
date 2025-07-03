import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  donorId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  donation: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: "", // Optional message field
  },
  date: {
    type: Date,
    default: Date.now, // Auto set date when created
  },
});
const Donor = mongoose.model("Donor", DonorSchema);
export default Donor;