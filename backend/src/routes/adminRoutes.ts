// File: src/routes/adminRoutes.ts
// This file defines the routes for admin-related operations in the application

import { Router } from "express";

// Import updated OTP-based controllers
import {
  registerAdminController,
  verifyAdminCodeController,
  loginAdminController,
} from "../controllers/adminController";

import verifyToken from "../middleware/verifyToken";

// Donor Controllers
import { createDonorController } from "../controllers/donorController";

// Search Donor Controller
import searchDonorController from "../controllers/searchDonorController";

const adminRoutes = Router();

/**
 * Admin Registration + Login Routes (OTP secured)
 */

// Register admin (allowed emails only, generates OTP)
adminRoutes.post("/register", registerAdminController);

// Verify OTP code and mark admin verified
adminRoutes.post("/verify-code", verifyAdminCodeController);

// Login admin (only if verified)
adminRoutes.post("/login", loginAdminController);

/**
 * Donor Routes (secured by JWT)
 */

// Search donor suggestions (token required)
adminRoutes.get("/donor/search", verifyToken, searchDonorController);

// Create donor and donation entry (token required)
adminRoutes.post("/donor/create", verifyToken, createDonorController);

export default adminRoutes;