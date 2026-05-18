const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middlewares/authMiddleware');

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

router.post('/', async (req, res) => {
    try {
        const { message, chat_history, auth_token } = req.body;
        
        // Map frontend chat history (sender/text) to backend ChatRequest schema (role/content)
        const mappedHistory = (chat_history || []).map((msg) => ({
            role: msg.sender === 'bot' ? 'assistant' : 'user',
            content: msg.text
        }));

        // Forward the request to FastAPI
        const response = await axios.post(`${FASTAPI_URL}/api/chat`, {
            message,
            chat_history: mappedHistory,
            auth_token
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error connecting to CineBot Service:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to connect to CineBot Service',
            message: error.message
        });
    }
});

module.exports = router;
