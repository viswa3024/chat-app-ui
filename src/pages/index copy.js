import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  overflow-y: auto;
  max-height: 400px;
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: ${(props) => (props.isUser ? '#daf8e3' : '#f1f0f0')};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isUser: true };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a simulated response.', isUser: false },
        ]);
      }, 1000);
    }
  };


  return (
    <div>
      <Head>
        <title>Chatbot Application</title>
        <meta name="description" content="Chatbot application using Falcon-7B model" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       <ChatContainer>
      <ChatHistory>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </ChatHistory>
      <InputContainer>
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
      </main>
    </div>
  );
}