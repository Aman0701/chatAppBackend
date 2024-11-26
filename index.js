import { configure } from './config.js';
import express from 'express';
import session from 'express-session'; // Import the express-session middleware
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors()); // Ensure CORS middleware is added for cross-origin requests

// Session Middleware
app.use(session({
    secret: 'secretKey',  // Change to a more secure key in production
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
        sameSite: 'lax',
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000  // 100 years
    }
}));

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io server
const io = new Server(server, {
    cors: {
        origin: '*',  // Allow all origins, change in production for security
        methods: ['GET', 'POST']
    }
});

// Listen for incoming connections
const port = Number(process.env.PORT);  // Default to 3000 if PORT is not set


server.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
