import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);

  .header {
    padding: 10px;
    background-color: #1877f2;
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .messages {
    height: 200px;
    padding: 10px;
    overflow-y: auto;
  }

  .input {
    display: flex;
    padding: 10px;

    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      margin-left: 10px;
      padding: 8px 12px;
      background-color: #1877f2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

const Chat = ({ friend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    // Implemente a lógica de envio de mensagem
    setMessages([...messages, { sender: 'Eu', content: newMessage }]);
    setNewMessage('');
  };

  return (
    <ChatContainer>
      <div className="header">Chat com {friend.nome}</div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </ChatContainer>
  );
};

export default Chat;
