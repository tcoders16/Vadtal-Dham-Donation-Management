import { Request, Response } from "express";
import { SearchDonorQuery } from "../interface/types";
import searchDonorService from "../service/searchDonorService";

export async function searchDonorController(req: Request, res: Response) {
  const { name, email, phone, amount, from, to }: SearchDonorQuery = req.query;

  try {
    const results = await searchDonorService({ name, email, phone, amount, from, to });
    res.status(200).json(results);
  } catch (error) {
    console.error("Search donors error:", error);
    res.status(500).json({ message: "Failed to search donors." });
  }
}

export default searchDonorController;