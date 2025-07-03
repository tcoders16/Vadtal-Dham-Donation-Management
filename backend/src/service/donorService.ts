import Donor from "../models/donarModel";
import { v4 as uuidv4 } from "uuid";

export async function createDonorService(
  name: string,
  email: string,
  phone: string,
  address: string,
  donation: number,
  message?: string, // Optional message field
) {
  const newDonor = await Donor.create({
    donorId: uuidv4(),
    name,
    email,
    phone,
    address,
    donation,
    message,
    // `date` auto-set by Mongoose
  });

  return newDonor;
}