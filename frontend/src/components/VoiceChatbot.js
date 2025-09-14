import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, MessageCircle, X } from 'lucide-react';
import './VoiceChatbot.css';

const VoiceChatbot = ({ user, isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    // Add welcome message
    setChatHistory([{
      role: 'assistant',
      content: `Hello ${user?.fullName || user?.username || 'Student'}! I'm your personal career mentor. I can help you with career guidance, study materials, exam information, and answer any questions about your educational journey. How can I assist you today?`,
      timestamp: new Date().toISOString()
    }]);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [user]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if (!voiceEnabled || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Get available voices and prefer Indian English
    const voices = synthRef.current.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang === 'en-IN' || voice.lang.startsWith('en')
    );
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim() || isProcessing) return;

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setTranscript('');

    try {
      const response = await fetch('/api/voice-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          userProfile: user,
          chatHistory: chatHistory.slice(-10) // Last 10 messages for context
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: data.timestamp
        };

        setChatHistory(prev => [...prev, assistantMessage]);
        
        // Speak the response if voice is enabled
        if (voiceEnabled) {
          speakText(data.response);
        }
      } else {
        // Handle error with fallback response
        const errorMessage = {
          role: 'assistant',
          content: data.fallbackResponse || "I'm sorry, I encountered an issue. Could you please try asking your question again?",
          timestamp: new Date().toISOString()
        };
        setChatHistory(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Voice chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet connection and try again.",
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (transcript.trim()) {
      handleSendMessage(transcript);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="voice-chatbot-overlay">
      <div className="voice-chatbot-container">
        <div className="chatbot-header">
          <div className="header-info">
            <MessageCircle className="header-icon" />
            <div>
              <h3>AI Career Mentor</h3>
              <span className="status">
                {isProcessing ? 'Thinking...' : isListening ? 'Listening...' : 'Ready to help'}
              </span>
            </div>
          </div>
          <div className="header-controls">
            <button 
              className={`voice-toggle ${voiceEnabled ? 'enabled' : 'disabled'}`}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
            >
              {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="chat-container" ref={chatContainerRef}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                <p>{message.content}</p>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="message assistant">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleTextSubmit} className="chat-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type your message or use voice..."}
                className="chat-input"
                disabled={isListening || isProcessing}
              />
              <div className="input-controls">
                {isSpeaking ? (
                  <button 
                    type="button" 
                    className="voice-btn speaking" 
                    onClick={stopSpeaking}
                    title="Stop speaking"
                  >
                    <VolumeX size={20} />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className={`voice-btn ${isListening ? 'listening' : ''}`}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isProcessing || !recognitionRef.current}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                )}
                <button 
                  type="submit" 
                  className="send-btn"
                  disabled={!transcript.trim() || isProcessing}
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </form>
          
          <div className="quick-actions">
            <button 
              className="quick-btn"
              onClick={() => handleSendMessage("What career options do I have after " + (user?.currentClass || "12th") + "?")}
            >
              Career Options
            </button>
            <button 
              className="quick-btn"
              onClick={() => handleSendMessage("Tell me about entrance exams for my stream")}
            >
              Entrance Exams
            </button>
            <button 
              className="quick-btn"
              onClick={() => handleSendMessage("I need study materials for class " + (user?.currentClass || "12"))}
            >
              Study Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;