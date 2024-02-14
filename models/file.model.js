const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    filename: String,
    uniqueCode: String
});

module.exports = mongoose.model('File', fileSchema);
