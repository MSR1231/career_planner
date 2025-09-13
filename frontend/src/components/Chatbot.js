// src/Chatbot.js
import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => setUserInput(event.target.value);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { user: true, text: userInput }];
      setMessages(newMessages);
      // Very simple logic; you can connect to backend for AI/chat in future
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { user: false, text: `You said: ${userInput}` }
        ]);
      }, 600);
      setUserInput('');
    }
  };

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, width: 320, margin: '16px auto', padding: 12}}>
      <h4 style={{marginBottom: 10}}>📢 Student Chatbot</h4>
      <div style={{height:120, overflowY:'auto', color:'#222', fontSize:15, marginBottom:6}}>
        {messages.map((m, i) => (
          <div key={i} style={{textAlign: m.user ? 'right' : 'left', margin:'2px 0'}}>
            <span style={{
              background: m.user ? '#d0f1ff' : '#f2f2f2',
              padding:'4px 8px',
              borderRadius: 12,
              display: 'inline-block'
            }}>{m.text}</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:2}}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          style={{flex:1, borderRadius: 6, border:'1px solid #aaa', padding:4}}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage} style={{marginLeft: 2, padding: '4px 10px'}}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
