const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const File = require('../models/file.model');

// multer config here
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

// file upload for key as file
exports.upload = upload.single('file');

exports.uploadFile = async (req, res) => {
    try {
        const uniqueCode = uuidv4().substr(0, 6);
        const filename = `${uniqueCode}.png`;

        const newFile = new File({
            filename,
            uniqueCode
        });
        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', uniqueCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.listFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findByIdAndDelete(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', `${file.uniqueCode}.png`)); // only png format
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const { uniqueCode } = req.params;
        const file = await File.findOne({ uniqueCode });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.download(path.join(__dirname, '..', 'uploads', `${file.uniqueCode}.png`), file.filename); // only png format
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
