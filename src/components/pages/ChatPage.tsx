import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Counsellor. I'm here to help you with your study-abroad journey. You can ask me about universities, application processes, visa requirements, or any other questions you have. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('university') || lowerMessage.includes('universities')) {
      return "I can help you explore universities! We have a comprehensive database of universities worldwide. You can browse them on our Universities page where you can filter by location, budget, and programs. Would you like me to recommend some based on your profile?";
    }
    
    if (lowerMessage.includes('application') || lowerMessage.includes('apply')) {
      return "The application process typically involves several stages: profile setup, university research, document preparation, and submission. Check out our Application Guidance page for detailed, stage-specific to-dos. Is there a specific stage you'd like help with?";
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return "Budget is an important consideration! Universities in our database range from under $20,000 to over $80,000 per year. This typically includes tuition and living expenses. You can filter universities by budget on our Universities page. What's your budget range?";
    }
    
    if (lowerMessage.includes('visa') || lowerMessage.includes('immigration')) {
      return "Visa requirements vary by country. Generally, you'll need: admission letter, proof of funds, passport, and sometimes language proficiency scores. I recommend checking the specific requirements for your target country. Which country are you interested in?";
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('toefl') || lowerMessage.includes('ielts') || lowerMessage.includes('gre') || lowerMessage.includes('gmat')) {
      return "Most universities require standardized tests like TOEFL/IELTS for English proficiency and GRE/GMAT for graduate programs. Requirements vary by university and program. Have you taken any of these exams yet?";
    }
    
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
      return "Many universities offer scholarships and financial aid! These can be merit-based, need-based, or specific to certain programs. I recommend checking each university's website for scholarship opportunities and deadlines. Would you like tips on writing scholarship applications?";
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('documents')) {
      return "Common application documents include: transcripts, letters of recommendation, statement of purpose, resume/CV, test scores, and passport copy. Some programs may require additional materials like portfolios or writing samples. Are you preparing documents for a specific program?";
    }
    
    if (lowerMessage.includes('deadline') || lowerMessage.includes('timeline')) {
      return "Application deadlines vary by university and program. Generally, fall intake deadlines are between December and March, while spring intake deadlines are around September-October. I recommend applying 6-12 months before your intended start date. Which intake are you targeting?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm here to help anytime. Feel free to ask more questions about your study-abroad journey. Good luck!";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you with your study-abroad plans today?";
    }
    
    // Default response
    return "That's a great question! While I can provide general guidance, I recommend exploring our Universities and Application Guidance pages for detailed information. You can also check your Dashboard to track your progress. Is there something specific I can help clarify?";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-[100rem] mx-auto w-full px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 h-full flex flex-col"
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl text-primary">
                  AI Counsellor Chat
                </h1>
                <p className="font-paragraph text-base text-secondary">
                  Get instant answers to your study-abroad questions
                </p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <Card className="flex-1 flex flex-col border-primary/20 overflow-hidden" style={{ minHeight: '500px' }}>
            {/* Messages */}
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-mutedgreen' 
                        : 'bg-primary'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block rounded-2xl px-6 py-4 ${
                        message.role === 'user'
                          ? 'bg-mutedgreen text-primary-foreground'
                          : 'bg-primary/5 text-foreground'
                      }`}>
                        <p className="font-paragraph text-base leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <p className="font-paragraph text-xs text-secondary mt-2 px-2">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="bg-primary/5 rounded-2xl px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-primary/10 p-6">
              <div className="flex gap-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question here..."
                  className="flex-1 h-12"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-12 px-6"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
