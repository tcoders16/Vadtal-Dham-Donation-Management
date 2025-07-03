import Donor from "../models/donarModel";
import { SearchDonorQuery } from "../interface/types";

/**
 * Service: Search donors by name, email, phone, amount, or date range.
 */
export async function searchDonorService({
  name,
  email,
  phone,
  amount,
  from,
  to,
}: SearchDonorQuery) {
  const filter: any = {};

  if (name) {
    filter.name = { $regex: name as string, $options: "i" };
  } else if (email) {
    filter.email = { $regex: email as string, $options: "i" };
  } else if (phone) {
    filter.phone = { $regex: phone as string, $options: "i" };
  } else if (amount) {
    filter.donation = parseFloat(amount as string);
  } else if (from && to) {
    filter.createdAt = {
      $gte: new Date(from as string),
      $lte: new Date(to as string),
    };
  } else {
    throw new Error("Provide at least one filter to search.");
  }

  const results = await Donor.find(filter).sort({ createdAt: -1 });

  return results;
}

export default searchDonorService;