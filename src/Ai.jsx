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
      originalContent: "Hello! I'm your AI farming assistant. How can I help you today?",
      translationKey: "Hello! I'm your AI farming assistant. How can I help you today?"
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const previousLanguageRef = useRef(i18n.language);

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

  // ================= Translate Previous Messages =================
  useEffect(() => {
    const translateMessages = async () => {
      if (previousLanguageRef.current === i18n.language) return;
      
      setIsTranslating(true);
      
      try {
        const messagesToTranslate = messages.filter(msg => msg.originalContent);
        
        for (const msg of messagesToTranslate) {
          try {
            const response = await fetch(
              "https://agriiyugchatbot.onrender.com/api/chat",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  message: `Translate this text to ${i18n.language}: "${msg.originalContent}"`,
                  conversation_history: [],
                  language: i18n.language || "en",
                }),
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              setMessages(prev => prev.map(m => 
                m.id === msg.id 
                  ? { ...m, content: data.response || data.message || msg.originalContent }
                  : m
              ));
            }
          } catch (error) {
            console.error(`Failed to translate message ${msg.id}:`, error);
          }
        }
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsTranslating(false);
        previousLanguageRef.current = i18n.language;
      }
    };

    translateMessages();
  }, [i18n.language]);

  // ================= Handle Send =================
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      originalContent: message,
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
              content: m.originalContent || m.content,
            })),
            language: i18n.language || "en",
          }),
        }
      );
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      const aiResponse = data.response || data.message || t("Sorry, I could not process your request.");
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          originalContent: aiResponse,
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
          originalContent: "⚠️ Trouble connecting to AI server.",
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
            {isTranslating && (
              <div className="bg-blue-100 text-blue-800 px-4 py-2 text-sm text-center border-b border-blue-200">
                🔄 {t("Translating messages...")}
              </div>
            )}
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
                    ? t("Listening")
                    : t("Ask me anything about farming...")
                }
                onKeyPress={(e) =>
                  e.key === "Enter" && !isTyping && handleSendMessage(inputValue)
                }
                disabled={isListening || isTranslating}
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
                disabled={isTyping || isTranslating}
              >
                <Mic className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isTyping || !inputValue.trim() || isTranslating}
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
