import { Request, Response } from "express";
import { createDonorService } from "../service/donorService";

export async function createDonorController(req: Request, res: Response) {
  try {
    const { name, email, phone, address, donation, message } = req.body;

    if (!name || !donation) {
      res.status(400).json({ message: "Name and donation are required." });
      return;
    }

    const newDonor = await createDonorService(name, email, phone, address, donation, message);

    res.json({ user: newDonor });  // << This works if newDonor is valid
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}