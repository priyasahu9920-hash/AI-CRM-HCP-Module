import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, addUserMessage } from '../store/chatSlice';
import { fetchInteractions } from '../store/interactionSlice';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const AIChatAssistant = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.chat);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    
    dispatch(addUserMessage(userMessage));
    await dispatch(sendMessage(userMessage));
    
    // Refresh interactions list automatically after a chat just in case the agent logged it
    dispatch(fetchInteractions());
  };

  return (
    <div className="chat-container">
      <h2 style={{ marginBottom: '1.5rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Bot size={24} /> AI Agent Chat
      </h2>
      
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`} style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>
              {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\\n/g, '<br/>') }} />
          </div>
        ))}
        {status === 'loading' && (
          <div className="message agent" style={{ display: 'flex', gap: '0.75rem' }}>
            <Bot size={18} />
            <div><Loader2 size={16} className="spinner" style={{ animation: 'spin 1.5s linear infinite' }} /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-area">
        <input 
          type="text" 
          className="form-input" 
          placeholder="e.g. Log a call with Dr. Sharma, he liked product X." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status === 'loading'}
        />
        <button type="submit" className="btn" disabled={status === 'loading'}>
          <Send size={18} />
        </button>
      </form>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AIChatAssistant;
