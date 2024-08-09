const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const translate = require('@vitalets/google-translate-api'); // Example translation library

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('message', async ({ message, lang }) => {
        try {
            // Translate message to the target language
            const translated = await translate(message, { to: lang });
            io.emit('message', { text: translated.text, lang });
        } catch (error) {
            console.error('Translation Error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
