const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const fs = require('fs');

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Ensure the qr_codes directory exists
const qrCodesDir = path.join(__dirname, 'qr_codes');
if (!fs.existsSync(qrCodesDir)) {
    fs.mkdirSync(qrCodesDir);
}

// Serve static files from the qr_codes directory
app.use('/qr_codes', express.static(qrCodesDir));

// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
