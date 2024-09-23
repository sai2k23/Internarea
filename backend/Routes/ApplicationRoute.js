const express = require("express");
const router = express.Router();
const Application = require("../Model/Application");
const PDFDocument = require('pdfkit'); // Ensure you have pdfkit installed
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Ensure you have uuid installed
const multer = require('multer');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name collisions
    }
});
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only images of type PNG or JPEG are allowed!');
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2 MB size limit for images
});

router.get('/subscription-status', async (req, res) => {
    const user = await User.findById(req.user.id); // Assuming you have user authentication in place
    res.json({ isPremium: user.isPremium });
});

// POST: Create a new application
router.post("/", async (req, res) => {
    try {
        const applicationData = new Application(req.body); // Automatically map request body to model
        const savedApplication = await applicationData.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error("Error creating application:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET: Fetch all applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        if (!applications.length) {
            return res.status(404).json({ error: "No applications found" });
        }
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

// POST route to generate resume and send it as a download
router.post('/generate-resume', upload.single('profileImage'), async (req, res) => {
    const {
        fullName, email, phone, address, summary, education, experience,
        skills, certifications, githubLink, linkedinLink, portfolioLink
    } = req.body;

    console.log('Uploaded file:', req.file);
    console.log('Request body:', req.body);

    if (!req.file) {
        return res.status(400).json({ error: 'Profile image is required and should be a valid PNG or JPEG.' });
    }

    // Parse skills and certifications from string to array
    let skillsArray, certificationsArray;
    try {
        skillsArray = JSON.parse(skills);
        certificationsArray = JSON.parse(certifications);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid skills or certifications format' });
    }

    if (!fullName || !email || !phone || !address || !summary || !education || !experience) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const doc = new PDFDocument();
        const fileName = `${uuidv4()}.pdf`;
        const filePath = path.join(__dirname, `../Data/${fileName}`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add Profile Image
        if (req.file) {
            const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
            doc.image(imagePath, { width: 100, align: 'center' });
            doc.moveDown();
        }

        // PDF content generation
        doc.fontSize(18).text('Resume', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${fullName}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Email: ${email}`);
        doc.text(`Address: ${address}`);
        doc.moveDown().text('Summary:');
        doc.fontSize(12).text(summary);
        doc.moveDown();

        // Education Section
        doc.fontSize(14).text('Education:');
        const educationArray = JSON.parse(education);
        educationArray.forEach((edu) => {
            doc.fontSize(12).text(`${edu.degree} from ${edu.institution} (${edu.yearFrom} - ${edu.yearTo})`);
            doc.text(`${edu.marksType}: ${edu.marksValue}`);
            doc.moveDown();
        });

        // Experience Section
        doc.fontSize(14).text('Experience:');
        const experienceArray = JSON.parse(experience);
        experienceArray.forEach((exp) => {
            doc.fontSize(12).text(`${exp.jobTitle} at ${exp.company} (${exp.yearFrom} - ${exp.yearTo})`);
            doc.text('Responsibilities:');
            doc.text(exp.responsibilities);
            doc.moveDown();
        });

        // Skills Section
        doc.fontSize(14).text('Skills:');
        skillsArray.forEach(skill => {
            doc.fontSize(12).text(`- ${skill}`);
        });
        doc.moveDown();

        // Certifications Section
        doc.fontSize(14).text('Certifications:');
        certificationsArray.forEach(cert => {
            doc.fontSize(12).text(`- ${cert}`);
        });
        doc.moveDown();

        // Links Section
        doc.fontSize(14).text('Links:');
        if (githubLink) doc.fontSize(12).text(`Github: ${githubLink}`);
        if (linkedinLink) doc.fontSize(12).text(`LinkedIn: ${linkedinLink}`);
        if (portfolioLink) doc.fontSize(12).text(`Portfolio: ${portfolioLink}`);
        doc.moveDown();

        doc.end();

        stream.on('finish', () => {
            res.download(filePath, `${fullName}_resume.pdf`, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).json({ error: 'Error downloading the file' });
                }
                fs.unlinkSync(filePath); // Delete the file after download
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generating resume' });
    }
});






// GET: Fetch a specific application by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        console.error("Error fetching application by ID:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT: Update application status (accepted/rejected)
router.post("/updateStatus/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the status is one of the allowed values
    const allowedStatuses = ['pending', 'accepted', 'rejected'];
    
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid action' });
    }

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ success: true, data: updatedApplication });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application status' });
    }
});

module.exports = router;
