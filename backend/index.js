const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("./db.js");
const applicationRoutes = require('./Routes/ApplicationRoute.js');
const adminRoutes = require('./Routes/admin.js');
const router=require("./Routes/index.js");
require('dotenv').config(); // Make sure to load environment variables

const app = express();

// PORT fallback if not provided in the .env file
const PORT = process.env.PORT || 5000;

// Enable CORS for requests from your frontend
app.use(cors({
    origin: ['http://localhost:3000', 'https://internshipsarea.netlify.app'], // Adjust this based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Security headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// Health check route
app.get("/", (req, res) => {
    res.send("Backend server is running");
});

app.use("/api",router)

// Application routes
app.use('/api/applications', applicationRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Connect to the database
connect().then(() => {
    // Start the server only after the database connection is successful
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if database connection fails
});
