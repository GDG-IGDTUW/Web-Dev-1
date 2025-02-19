import express from "express";

const router = express.Router();

import { fetchAlumniData,createAlumniData } from "../controller/alumniDirectoryController.js";

// Fetch all alumni from MongoDB
router.get("/", fetchAlumniData);

// Add a new alumni
router.post("/", createAlumniData);

export default router;
