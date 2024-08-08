const express = require('express');
const User = require('../models/user');
const generateQRCode = require('../qrCodeGenerator');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    const { name, age, vehicle, role } = req.body;

    try {
        const newUser = new User({
            name,
            age,
            vehicle,
            role,
        });
        await newUser.save();

        // Generate QR code for the user
        const qrCodePath = await generateQRCode(newUser._id);

        res.status(201).json({ user: newUser, qrCode: `http://localhost:5000/qr_codes/${path.basename(qrCodePath)}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    const { name, age, vehicle, role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, age, vehicle, role },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
