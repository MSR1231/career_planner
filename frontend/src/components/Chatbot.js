import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { user: false, text: 'Hello! Ask me anything about career planning.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { user: true, text: input };
    setMessages(prev => [...prev, userMsg]);

    // Dummy bot reply after delay
    setTimeout(() => {
      setMessages(prev => [...prev, { user: false, text: `You said: ${input}` }]);
    }, 500);

    setInput('');
  };

  return (
    <div style={{ width: 350, border: '1px solid #007bff', borderRadius: 8, padding: 10, background: '#f0f8ff' }}>
      <div style={{ height: 200, overflowY: 'auto', marginBottom: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{textAlign: msg.user ? 'right' : 'left', margin: '5px 0'}}>
            <span style={{display: 'inline-block', padding: '5px 10px', borderRadius: 15, background: msg.user ? '#007bff' : '#e0e0e0', color: msg.user ? '#fff' : '#000'}}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input type="text" className="form-control" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendMessage()} placeholder="Type here..." />
      <button className="btn btn-primary mt-1 w-100" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
