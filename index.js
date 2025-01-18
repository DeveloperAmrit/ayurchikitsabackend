import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createUser, modifyUser, deleteUser, fetchUser } from './handlers/handleUser.js';
import { createCase, modifyCase, deleteCase, fetchCase, fetchAllCases } from './handlers/handleCase.js';
import { uploadToCloudinary } from './handlers/handleImageUpload.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// for mongoose logs
mongoose.set('debug', true);

// .env file use
const USERNAME = process.env.DB_USERNAME || '';
const PASSWORD = process.env.PASSWORD || '';
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.myzmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// connecting to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (err) {
    console.log(err);
}

// END POINTS

// for handling User

app.post("/createUser", async (req, res) => {
    const { userId, name, email, photoURL, college, isAdvertiser } = req.body;
    try {
        await createUser(userId, name, email, photoURL, college, isAdvertiser);
        res.status(200).json({ message: "User created Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user", error: `${err}` });
    }
});

app.post("/modifyUser", async (req, res) => {
    const { userId, updates } = req.body;
    try {
        await modifyUser(userId, updates);
        res.status(200).json({ message: "User updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user", error: `${err}` });
    }
});

app.post("/deleteUser", async (req, res) => {
    const { userId } = req.body;
    try {
        await deleteUser(userId);
        res.status(200).json({ message: "User deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user", error: `${err}` });
    }
});

app.post("/getUser", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await fetchUser(userId);
        res.status(200).json({ user: user, message: "User fetched successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while fetching user" });
    }
});

// for handling cases

app.post("/createCase", async (req, res) => {
    const { doctorId, patientId, title, description, firstImageURL } = req.body;
    try {
        createCase( doctorId, patientId, title, description, firstImageURL );
        res.status(200).json({ message: "Case created Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create case", error: `${err}` });
    }
}); 

app.post("/modifyCase", async (req, res) => {
    const { caseId, updates } = req.body;
    try {
        await modifyCase(caseId, updates);
        res.status(200).json({ message: "Case updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update case", error: `${err}` });
    }
});

app.post("/deleteCase", async (req, res) => {
    const { caseId } = req.body;
    try {
        await deleteCase(caseId);
        res.status(200).json({ message: "Case deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete case", error: `${err}` });
    }
});

app.get("/getCase", async (req, res) => {
    const { caseId } = req.body;
    try {
        const caseData = await fetchCase(caseId);
        res.status(200).json({ case: caseData, message: "Case fetched successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while fetching case" });
    }
});

app.get("/getAllCases", async (req, res) => {
    try {
        const cases = await fetchAllCases();
        res.status(200).json({ cases: cases, message: "Cases fetched successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while fetching cases" });
    }
});

// for handling image uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) throw new Error("No file provided");
        const imageURL = await uploadToCloudinary(req.file.originalname, req.file);
        res.status(200).json({ url: imageURL, message: "Image uploaded successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while uploading image", error: `${err}` });
    }
});

// starting the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
