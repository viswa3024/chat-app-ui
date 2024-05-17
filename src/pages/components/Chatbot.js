import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);
  
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8000/ws');  // Ensure this URL is correct
      ws.current.onmessage = (event) => {
        const botMessage = { sender: 'bot', text: event.data };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      };
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
      return () => {
        ws.current.close();
      };
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const userMessage = { sender: 'user', text: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      ws.current.send(input);
      setInput('');
    };

  return (
    <div>
      <h1>Chatbot</h1>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
        className="input-se"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button-se" type="submit">Send</button>
      </form>
      <style jsx>{`
        .chatbox {
          border: 1px solid #ccc;
          padding: 10px;
          height: 300px;
          overflow-y: scroll;
        }
        .user {
          text-align: right;
          color: blue;
        }
        .bot {
          text-align: left;
          color: green;
        }
        form {
          display: flex;
        }
        input {
          flex: 1;
          padding: 10px;
        }
        button {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;