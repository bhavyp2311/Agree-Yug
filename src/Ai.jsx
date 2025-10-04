// /*
//                 gu = Gujarati(ગુજરાતી)
//                 en = English
//                 be = Bengali(বাংলা)
//                 hi = Hindi(हिन्दी)
//                 mr = Marathi(मराठी)
//                 te = Telugu(తెలుగు
//                 ma = Malayalam(മലയാളം)
//                 ta = Tamil(தமிழ்)
//                 ka = kannada(ಕನ್ನಡ)
//                 pu = Punjabi(ਪੰਜਾਬੀ)
//                 od = Odia(ଓଡିଆ)
//                 as = Assamese(অসমীয়া)
//                 ur = Urdu(اردو)
// */

// import { useState, useRef, useEffect } from "react";
// import "./Ai.css"
// import {
//   Send,
//   Mic,
//   MicOff,
//   Leaf,
//   Cloud,
//   Droplets,
//   Sun,
//   MessageCircle,
//   Lightbulb,
//   TrendingUp
// } from "lucide-react";


// const translations = {
//   en: {
//     'ai.greeting': "Hello! I'm your AI farming assistant. How can I help you today?",
//     'ai.title': "Smart Farming Assistant",
//     'ai.subtitle': "Get instant answers to your farming questions with AI-powered insights",
//     'ai.placeholder': "Ask me anything about farming...",
//     'ai.quickQuestions': "Quick Questions"
//   }
// };

// const Button = ({ children, onClick, variant = "default", size = "default", className = "", disabled, ...props }) => {
//   const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     default: "bg-green-600 text-white hover:bg-green-700",
//     outline: "border-2 border-gray-300 bg-white hover:bg-gray-50",
//   };
//   const sizes = {
//     default: "px-4 py-2",
//     icon: "w-10 h-10",
//   };

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };
// const Input = ({ className = "", ...props }) => (
//   <input
//     className={`w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
//     {...props}
//   />
// );


// const Card = ({ children, className = "", onClick }) => (
//   <div
//     onClick={onClick}
//     className={`bg-white rounded-lg shadow-md p-4 ${className}`}
//   >
//     {children}
//   </div>
// );

// const quickSuggestions = [
//   {
//     icon: Cloud,
//     text: "When should I plant tomatoes?",
//     category: "Planting"
//   },
//   {
//     icon: Droplets,
//     text: "How much water do my crops need?",
//     category: "Irrigation"
//   },
//   {
//     icon: Sun,
//     text: "Best fertilizer for wheat season?",
//     category: "Fertilization"
//   },
//   {
//     icon: TrendingUp,
//     text: "Current market prices for rice",
//     category: "Market"
//   }
// ];

// export default function AIAssistant() {
//   const t = (key) => translations.en[key] || key;

//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       content: t('ai.greeting'),
//       sender: 'ai',
//       timestamp: new Date(),
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInputValue(transcript);
//         setIsListening(false);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error("🎤 Speech recognition error details:", event);
//         setIsListening(false);

//         let errorMsg = 'Microphone error: ';
//         switch (event.error) {
//           case 'not-allowed':
//             errorMsg += 'Permission denied. Please allow mic in browser settings.';
//             break;
//           case 'no-speech':
//             errorMsg += 'No speech detected. Try again.';
//             break;
//           case 'network':
//             errorMsg += 'Network issue. Check internet connection.';
//             break;
//           default:
//             errorMsg += event.error;
//         }
//         alert(errorMsg);
//       };

//       recognitionRef.current.onend = () => {
//         setIsListening(false);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   const handleSendMessage = async (message) => {
//   if (!message.trim()) return;

//   const userMessage = {
//     id: Date.now().toString(),
//     content: message,
//     sender: 'user',
//     timestamp: new Date(),
//   };

//   setMessages(prev => [...prev, userMessage]);
//   setInputValue('');
//   setIsTyping(true);

//   try {
//     // ================ Python api called here =================
//     const response = await fetch('https://agriiyugchatbot.onrender.com/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: message,
//         conversation_history: messages.map(m => ({
//           role: m.sender === 'user' ? 'user' : 'assistant',
//           content: m.content
//         }))
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('API request failed');
//     }

//     const data = await response.json();

//     const aiResponse = {
//       id: (Date.now() + 1).toString(),
//       content: data.response || data.message || 'Sorry, I could not process your request.',
//       sender: 'ai',
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, aiResponse]);
//   } catch (error) {
//     console.error('Error calling AI API:', error);

//     const aiResponse = {
//       id: (Date.now() + 1).toString(),
//       content: "⚠️ I'm having trouble connecting to the AI server. Please check if the API is online: https://agriiyugchatbot.onrender.com",
//       sender: 'ai',
//       timestamp: new Date(),
//     };
//     setMessages(prev => [...prev, aiResponse]);
//   } finally {
//     setIsTyping(false);
//   }
// };
//   const handleQuickSuggestion = (text) => {
//     handleSendMessage(text);
//   };

//    const handleVoiceToggle = () => {
//   if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//     alert("❌ Voice input not supported on this browser/device. Please use Chrome on desktop or Android.");
//     return;
//   }

//   // iOS fallback
//   if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//     alert("🎤 Voice input not supported on iOS Safari/Chrome yet. Please type instead.");
//     return;
//   }

//   if (!window.isSecureContext) {
//     alert("Microphone requires HTTPS or localhost.");
//     return;
//   }

//   try {
//     // Directly trigger getUserMedia inside click
//     navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//       // Stop any existing stream tracks immediately to prevent mic block
//       stream.getTracks().forEach(track => track.stop());

//       if (isListening) {
//         recognitionRef.current.stop();
//         setIsListening(false);
//       } else {
//         recognitionRef.current.start();
//         setIsListening(true);
//       }
//     });
//   } catch (err) {
//     console.error("Mic permission error:", err);
//     alert("Microphone access denied. Please check browser/OS settings.");
//   }
// };

//   return (
//     <div className="min-h-screen  py-3 bg-[#fffcf0]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8 py-10">
//           <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full px-6 py-3 mb-4">
//             {/* <Leaf className="w-6 h-6 text-white" /> */}
//             <section className="text-white">🌱</section>
//             {/* <span class="material-symbols-outlined">potted_plant</span> */}
//             <span className="text-white font-semibold">AI Farming Assistant</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {t('ai.title')}
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             {t('ai.subtitle')}
//           </p>
//         </div>

//         {/* Quick Suggestions */}
//         <div className="space-y-4 p-5  py-10 w-full">
//           <div className="flex items-center space-x-2">
//             <Lightbulb className="w-5 h-5 text-green-600" />
//             <h3 className="text-lg font-semibold text-gray-900">{t('ai.quickQuestions')}</h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
//             {quickSuggestions.map((suggestion, index) => {
//               const Icon = suggestion.icon;
//               return (
//                 <Card
//                   key={index}
//                   className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 "
//                   onClick={() => handleQuickSuggestion(suggestion.text)}
//                 >
//                   <div className="flex items-center space-x-4 space-y-4">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                       <Icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-xs text-green-600 font-medium mb-1">{suggestion.category}</div>
//                       <div className="text-sm font-medium text-gray-900">{suggestion.text}</div>
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         {/* Chat Container */}

//         <div className="w-full p-6">
//           <Card className="mb-6 h-[100vh]  flex flex-col static bg-gray-50">
//             {/* Messages Area */}
//             <div className="flex-1  overflow-y-auto p-4 space-y-4">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
//                         ? 'bg-green-600 text-white'
//                         : 'bg-gray-100 text-gray-800'
//                       }`}
//                   >
//                     {message.sender === 'ai' && (
//                       <div className="flex items-center space-x-2 mb-1">
//                         <MessageCircle className="w-4 h-4 text-green-600" />
//                         <span className="text-xs font-medium text-green-600">AI Assistant</span>
//                       </div>
//                     )}
//                     <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//                     <p className="text-xs opacity-70 mt-1">
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {isTyping && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <MessageCircle className="w-4 h-4 text-green-600" />
//                       <span className="text-xs font-medium text-green-600">AI Assistant</span>
//                     </div>
//                     <div className="flex space-x-1 py-2">
//                       <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                       <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex space-x-2">
//                 <Input
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   placeholder={isListening ? "Listening..." : t('ai.placeholder')}
//                   onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage(inputValue)}
//                   disabled={isListening}
//                 />
//                 <Button
//                   onClick={handleVoiceToggle}
//                   variant="outline"
//                   size="icon"
//                   className={isListening ? "bg-red-500 text-grey border-red-500 p-1" : "p-1"}
//                   disabled={isTyping}
//                 >
//                   {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
//                 </Button>
//                 <Button
//                   onClick={() => handleSendMessage(inputValue)}
//                   disabled={isTyping || !inputValue.trim()}
//                 >
//                   <Send className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// ========================================
// import { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Send, Mic, MicOff, Cloud, Droplets, Sun, MessageCircle, Lightbulb, TrendingUp } from "lucide-react";


// // Language code mapping for Speech Recognition
// const languageCodeMap = {
//   en: 'en-US',
//   gu: 'gu-IN',
//   hi: 'hi-IN',
//   be: 'bn-IN',
//   te: 'te-IN',
//   mr: 'mr-IN',
//   ma: 'ml-IN',
//   ta: 'ta-IN',
//   ka: 'kn-IN',
//   pu: 'pa-IN',
//   od: 'or-IN',
//   as: 'as-IN',
//   ur: 'ur-IN'
// };


// const Button = ({ children, onClick, variant = "default", size = "default", className = "", disabled, ...props }) => {
//   const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     default: "bg-green-600 text-white hover:bg-green-700",
//     outline: "border-2 border-gray-300 bg-white hover:bg-gray-50",
//   };
//   const sizes = { default: "px-4 py-2", icon: "w-10 h-10" };

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// const Input = ({ className = "", ...props }) => (
//   <input
//     className={`w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
//     {...props}
//   />
// );

// const Card = ({ children, className = "", onClick }) => (
//   <div onClick={onClick} className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
//     {children}
//   </div>
// );

// const quickSuggestions = [
//   { text: "When should I plant tomatoes?", category: "Planting", icon: Cloud },
//   { text: "How much water do my crops need?", category: "Irrigation", icon: Droplets },
//   { text: "Best fertilizer for wheat season?", category: "Fertilization", icon: Sun },
//   { text: "Current market prices for rice", category: "Market", icon: TrendingUp }
// ];

// export default function AIAssistant() {
//   const { i18n } = useTranslation();
//   const [messages, setMessages] = useState([{ id: '1', content: "Hello! I'm your AI farming assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }]);
//   const [inputValue, setInputValue] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
//   useEffect(() => scrollToBottom(), [messages]);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = languageCodeMap[i18n.language || 'en'] || 'en-US';

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInputValue(transcript);
//         setIsListening(false);
//       };

//       recognitionRef.current.onerror = () => setIsListening(false);
//       recognitionRef.current.onend = () => setIsListening(false);
//     }
//     return () => recognitionRef.current?.stop();
//   }, [i18n.language]);

//   const handleSendMessage = async (message) => {
//     if (!message.trim()) return;
//     const userMessage = { id: Date.now().toString(), content: message, sender: 'user', timestamp: new Date() };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsTyping(true);

//     try {
//       const response = await fetch('https://agriiyugchatbot.onrender.com/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message, conversation_history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.content })), language: i18n.language || 'en' }),
//       });
//       if (!response.ok) throw new Error('API request failed');
//       const data = await response.json();
//       setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: data.response || data.message || 'Sorry, I could not process your request.', sender: 'ai', timestamp: new Date() }]);
//     } catch (error) {
//       console.error(error);
//       setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: "⚠️ Trouble connecting to AI server.", sender: 'ai', timestamp: new Date() }]);
//     } finally { setIsTyping(false); }
//   };

//   const handleQuickSuggestion = (text) => handleSendMessage(text);

//   const handleVoiceToggle = () => {
//     if (!recognitionRef.current) return alert("Voice input not supported.");
//     if (isListening) recognitionRef.current.stop(), setIsListening(false);
//     else recognitionRef.current.lang = languageCodeMap[i18n.language || 'en'] || 'en-US', recognitionRef.current.start(), setIsListening(true);
//   };


//   return (
//     <div className="min-h-screen py-3 bg-[#fffcf0]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center mb-8 py-10">
//           <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full px-6 py-3 mb-4">
//             <span className="text-white text-2xl">🌱</span>
//             <span className="text-white font-semibold">AI Farming Assistant</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Farming Assistant</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">Get instant answers to your farming questions with AI-powered insights</p>
//         </div>

//         {/* Quick Suggestions */}
//         <div className="space-y-4 p-5 py-10 w-full">
//           <div className="flex items-center space-x-2"><Lightbulb className="w-5 h-5 text-green-600" /><h3 className="text-lg font-semibold text-gray-900">Quick Questions</h3></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
//             {quickSuggestions.map((s, i) => {
//               const Icon = s.icon;
//               return (
//                 <Card key={i} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105" onClick={() => handleQuickSuggestion(s.text)}>
//                   <div className="flex items-center space-x-4 space-y-4">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                       <Icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-xs text-green-600 font-medium mb-1">{s.category}</div>
//                       <div className="text-sm font-medium text-gray-900">{s.text}</div>
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         {/* Chat Container */}
//         <div className="w-full p-6">
//           <Card className="mb-6 h-[100vh] flex flex-col static bg-gray-50">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
//                     {msg.sender === 'ai' && <div className="flex items-center space-x-2 mb-1"><MessageCircle className="w-4 h-4 text-green-600" /><span className="text-xs font-medium text-green-600">AI Assistant</span></div>}
//                     <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
//                     <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//                   </div>
//                 </div>
//               ))}
//               {isTyping && <div className="flex justify-start"><div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg"><div className="flex items-center space-x-2"><MessageCircle className="w-4 h-4 text-green-600" /><span className="text-xs font-medium text-green-600">AI Assistant</span></div><div className="flex space-x-1 py-2"><div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div><div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div></div></div></div>}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t border-gray-200 flex space-x-2">
//               {/* <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={isListening ? `Listening... (${languageCodeMap[i18n.language]})` : 'Ask me anything about farming...'} onKeyPress={e => e.key === 'Enter' && !isTyping && handleSendMessage(inputValue)} disabled={isListening} /> */}
//               <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={isListening ? `Listening` : 'Ask me anything about farming...'} onKeyPress={e => e.key === 'Enter' && !isTyping && handleSendMessage(inputValue)} disabled={isListening} />
              
//               <Button onClick={handleVoiceToggle} variant="outline" size="icon" className={isListening ? "bg-red-500 text-white border-red-500 p-1" : "p-1"} disabled={isTyping}><Mic className="w-5 h-5" /></Button>
//               <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}><Send className="w-5 h-5" /></Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// ====================================

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Send,
  Mic,
  Cloud,
  Droplets,
  Sun,
  MessageCircle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

// ================= Language Code Map =================
const languageCodeMap = {
  en: "en-US",
  gu: "gu-IN",
  hi: "hi-IN",
  be: "bn-IN",
  te: "te-IN",
  mr: "mr-IN",
  ma: "ml-IN",
  ta: "ta-IN",
  ka: "kn-IN",
  pu: "pa-IN",
  od: "or-IN",
  as: "as-IN",
  ur: "ur-IN",
};

// ================= Reusable Components =================
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50",
  };
  const sizes = { default: "px-4 py-2", icon: "w-10 h-10" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-lg shadow-md p-4 ${className}`}
  >
    {children}
  </div>
);

// ================= Quick Suggestions =================
const quickSuggestions = [
  { text: "When should I plant tomatoes?", category: "Planting", icon: Cloud },
  {
    text: "How much water do my crops need?",
    category: "Irrigation",
    icon: Droplets,
  },
  {
    text: "Best fertilizer for wheat season?",
    category: "Fertilization",
    icon: Sun,
  },
  {
    text: "Current market prices for rice",
    category: "Market",
    icon: TrendingUp,
  },
];

// ================= Main Component =================
export default function AIAssistant() {
  const { t, i18n } = useTranslation(); 
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: t(
        "Hello! I'm your AI farming assistant. How can I help you today?"
      ),
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [messages]);

  // ================= Initialize Speech Recognition =================
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang =
        languageCodeMap[i18n.language || "en"] || "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => recognitionRef.current?.stop();
  }, [i18n.language]);

  // ================= Handle Send =================
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://agriiyugchatbot.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            conversation_history: messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.content,
            })),
            language: i18n.language || "en",
          }),
        }
      );
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content:
            data.response ||
            data.message ||
            t("Sorry, I could not process your request."),
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),

          content: "⚠️ " + t("Trouble connecting to AI server."),
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ================= Handle Voice Input =================
  const handleVoiceToggle = () => {
    if (!recognitionRef.current) return alert("Voice input not supported.");
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang =
        languageCodeMap[i18n.language || "en"] || "en-US";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ================= Handle Quick Suggestion =================
  const handleQuickSuggestion = (text) => handleSendMessage(t(text));

  return (
    <div className="min-h-screen py-3 bg-[#fffcf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 py-10">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full px-6 py-3 mb-4">
            <span className="text-white text-2xl">🌱</span>
            <span className="text-white font-semibold">
              {t("AI Farming Assistant")}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("Smart Farming Assistant")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "Get instant answers to your farming questions with AI-powered insights"
            )}
          </p>
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-4 p-5 py-10 w-full">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Quick Questions")}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {quickSuggestions.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card
                  key={i}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handleQuickSuggestion(s.text)}
                >
                  <div className="flex items-center space-x-4 space-y-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-green-600 font-medium mb-1">
                        {t(s.category)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {t(s.text)}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Chat Container */}
        <div className="w-full p-6">
          <Card className="mb-6 h-[100vh] flex flex-col static bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                          {t("AI Assistant")}
                        </span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        {t("AI Assistant")}
                      </span>
                    </div>
                    <div className="flex space-x-1 py-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isListening
                    ? t("Listening") // ✅ EDIT: wrapped in t()
                    : t("Ask me anything about farming...") // ✅ EDIT: wrapped in t()
                }
                onKeyPress={(e) =>
                  e.key === "Enter" && !isTyping && handleSendMessage(inputValue)
                }
                disabled={isListening}
              />

              <Button
                onClick={handleVoiceToggle}
                variant="outline"
                size="icon"
                className={
                  isListening
                    ? "bg-red-500 text-white border-red-500 p-1"
                    : "p-1"
                }
                disabled={isTyping}
              >
                <Mic className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isTyping || !inputValue.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
