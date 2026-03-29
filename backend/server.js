// Import required packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create HTTP server and Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    // Handle events
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Routes (example)
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Save user to database (pseudocode)
        // const user = new User({ username: req.body.username, password: hashedPassword });
        // await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/login', (req, res) => {
    // Authenticate user and generate token (pseudocode)
    // const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});