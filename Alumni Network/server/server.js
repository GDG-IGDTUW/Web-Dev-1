import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./utils/dbConnect.js";

import alumniRoutes from "./routes/alumniDirectoryRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/alumni", alumniRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();
