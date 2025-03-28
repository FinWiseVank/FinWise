import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaComments, FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';

export const Messages = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Hola, ¿en qué puedo ayudarte?', sender: 'bot' },
  ]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Crear un div específico para el portal
  const portalElement = useRef(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'chat-portal-root';
    document.body.appendChild(el);
    portalElement.current = el;

    return () => document.body.removeChild(el);
  }, []);

  // Enfocar el input cuando se abre el chat
  useEffect(() => {
    if (showChat) inputRef.current?.focus();
  }, [showChat]);

  const toggleChat = () => setShowChat((prev) => !prev);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages((prev) => [...prev, { text: message, sender: 'user' }]);
      setMessage('');
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => setMessage(e.target.value);
  const handleKeyDown = (e) => e.key === 'Enter' && handleSendMessage();

  const ChatComponent = () => (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      ref={chatContainerRef} // Referencia para el contenedor
    >
      <div className="fixed bottom-24 right-6 w-80 h-96 flex flex-col pointer-events-auto">
        <div className="relative flex-1 bg-white rounded-2xl shadow-xl border-2 border-blue-500 overflow-hidden">
          <div className="absolute inset-0 bg-white z-0"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-blue-500 text-white rounded-t-2xl">
              <h2 className="text-lg font-bold">Chatbot</h2>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Cerrar chat"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 bg-white border border-gray-300 rounded-lg m-0.5">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-2 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.sender === 'bot' && (
                    <FaRobot className="text-gray-500 mr-2 self-center" />
                  )}
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === 'bot' ? 'bg-gray-100 text-black' : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border border-gray-300 rounded-lg p-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Escribe tu mensaje"
                  autoFocus // Asegurar foco automático
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-blue-500 text-white p-2 h-10 w-10 rounded-full hover:bg-blue-600 transition flex items-center justify-center -translate-y-1.5 focus:outline-none"
                  aria-label="Enviar mensaje"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button 
          onClick={toggleChat}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 hover:bg-blue-600 focus:outline-none"
          aria-label={showChat ? "Cerrar chat" : "Abrir chat"}
        >
          {showChat ? <FaTimes /> : <FaComments />}
        </button>
      </div>
      
      {showChat && portalElement.current && createPortal(<ChatComponent />, portalElement.current)}
    </>
  );
};