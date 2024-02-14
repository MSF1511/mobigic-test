const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.route');
const fileRoutes = require('./routes/file.route');
const config = require('./config');

require('dotenv').config();

const app = express();

// db connection
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// use json
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
