import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Backend server address

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        socket.on('message', ({ text, lang }) => {
            setChat([...chat, { text, lang }]);
        });
    }, [chat]);

    const sendMessage = () => {
        if (message) {
            socket.emit('message', { message, lang: language });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Multilingual Chat</h1>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                {/* Add more languages as needed */}
            </select>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}>{msg.text} ({msg.lang})</p>
                ))}
            </div>
        </div>
    );
}

export default App;
