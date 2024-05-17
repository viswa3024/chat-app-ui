import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  overflow-y: auto;
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: ${(props) => (props.isUser ? '#daf8e3' : '#f1f0f0')};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: 5px;
  max-width: 75%;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const TextInput = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  max-height: 200px;
  overflow-y: auto;
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
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.style.height = 'auto';
      textInputRef.current.style.height = textInputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <>
      <Head>
        <title>Chatbot Application</title>
        <meta name="description" content="Chatbot application using Falcon-7B model" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          ref={textInputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
    </>
  );
}