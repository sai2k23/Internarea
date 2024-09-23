const express = require('express');
const router = express.Router();

// Admin login route
router.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;

    // Add your logic for authentication
    if (username === 'admin' && password === 'password') {
        res.json({ message: 'Admin logged in successfully' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
