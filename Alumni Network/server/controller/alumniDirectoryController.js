import Alumni from "../models/alumniDirectoryModel.js";

// Fetch all alumni from MongoDB
export const fetchAlumniData = async (req, res) => {
    console.log('Request Body :',req.body)
    try {
        const alumni = await Alumni.find();
        console.log('Alumni Fetched Successfully!')
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new alumni
export const createAlumniData = async (req, res) => {
    try {
        const newAlumni = new Alumni(req.body);
        const savedAlumni = await newAlumni.save();
        console.log('Alumni Saved successfully!')
        res.status(201).json(savedAlumni);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

