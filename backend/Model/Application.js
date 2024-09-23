const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
    
   

    
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    Application: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
});

module.exports = mongoose.model("Application", applicationSchema);
