const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

router.post('/upload', fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.delete('/:fileId', fileController.deleteFile);
router.get('/download/:fileId', fileController.downloadFile);

module.exports = router;
