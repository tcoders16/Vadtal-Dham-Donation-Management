import { Request, Response } from "express";
import Donor from "../models/donarModel"; // Ensure this path is correct


export async function searchDonorController(req: Request, res: Response) {
  const { query } = req.query;

  if (!query) {
     res.status(400).json({ message: "Query is required." });
  }

  try {
    const donors = await Donor.find({
      $or: [
        { name: { $regex: query as string, $options: "i" } },
        { phone: { $regex: query as string, $options: "i" } },
        { email: { $regex: query as string, $options: "i" } }
      ]
    }).limit(5);

    res.status(200).json(donors);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Failed to search donors." });
  }
}




export default searchDonorController;