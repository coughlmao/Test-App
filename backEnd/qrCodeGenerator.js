const { MongoClient, ObjectId } = require('mongodb');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string

const client = new MongoClient(uri);

async function generateQRCode(userId) {
    try {
        await client.connect();
        const database = client.db('dbConnect'); // Replace with your database name
        const collection = database.collection('users'); // Replace with your collection name

        // Find the user by ObjectId
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            console.log('User not found');
            return;
        }

        // Generate QR code from the ObjectId
        const qrCodePath = path.join(__dirname, `qr_codes/${userId}.png`);

        // Ensure the qr_codes directory exists
        if (!fs.existsSync(path.join(__dirname, 'qr_codes'))) {
            fs.mkdirSync(path.join(__dirname, 'qr_codes'));
        }

        await QRCode.toFile(qrCodePath, userId.toString());

        console.log(`QR Code generated at ${qrCodePath}`);
        return qrCodePath; // Return the path for further use
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

module.exports = generateQRCode;
