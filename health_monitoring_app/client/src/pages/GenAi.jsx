import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const GenAi = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/chat/', { message: input });
            const aiMessage = { sender: 'ai', text: response.data.data };
            console.log(aiMessage.text)
            setMessages([...messages, userMessage, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div className="flex flex-col w-full max-w-[600px] border-2 rounded-lg border-blue-800 h-[calc(100vh-128px)] bg-gray-300">
            <div className="flex-grow p-6 overflow-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-4 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-400 text-black self-start'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 rounded-b-lg bg-white border-t border-gray-300">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-grow p-2 border border-gray-500 rounded-l-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                        className="p-2 px-6 bg-gray-900 text-white rounded-r-lg"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenAi;