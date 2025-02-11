import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const Alumni = mongoose.model("Alumni", alumniSchema); // Model name should be provided

export default Alumni;

