
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { detectFallacies, generateAiResponse } from '@/utils/debateUtils';
import { MessageType, Fallacy } from '@/utils/types';

interface DebateInterfaceProps {
  topic: string;
  userPosition: 'for' | 'against';
  onBack: () => void;
}

const DebateInterface: React.FC<DebateInterfaceProps> = ({ 
  topic, 
  userPosition, 
  onBack 
}) => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showFallacies, setShowFallacies] = useState<{[key: string]: boolean}>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Start the debate with an AI introduction
  useEffect(() => {
    startDebate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const startDebate = async () => {
    setIsAiTyping(true);
    
    try {
      const aiPosition = userPosition === 'for' ? 'against' : 'for';
      const initialMessage = {
        id: Date.now().toString(),
        content: await generateAiResponse(topic, aiPosition, 'introduction', ''),
        sender: 'ai',
        fallacies: []
      };
      
      setMessages([initialMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start the debate. Please try again.",
      });
    } finally {
      setIsAiTyping(false);
    }
  };
  
  const handleSendMessage = async () => {
    if (!userInput.trim() || isAiTyping) return;
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      fallacies: detectFallacies(userInput)
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsAiTyping(true);
    
    try {
      const aiPosition = userPosition === 'for' ? 'against' : 'for';
      const aiResponseContent = await generateAiResponse(topic, aiPosition, 'response', userInput);
      
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: 'ai',
        fallacies: []
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a response. Please try again.",
      });
    } finally {
      setIsAiTyping(false);
    }
  };
  
  const toggleFallacyDetails = (messageId: string) => {
    setShowFallacies(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };
  
  const renderFallacyBadge = (message: MessageType) => {
    if (message.fallacies.length === 0) return null;
    
    return (
      <div className="mt-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-yellow-600 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
          onClick={() => toggleFallacyDetails(message.id)}
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {message.fallacies.length} Logical {message.fallacies.length === 1 ? 'Fallacy' : 'Fallacies'} Detected
        </Button>
        
        {showFallacies[message.id] && (
          <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-200">
            <h4 className="font-semibold mb-2 text-yellow-700">Fallacies Detected:</h4>
            <ul className="space-y-2">
              {message.fallacies.map((fallacy, index) => (
                <li key={index} className="text-sm">
                  <p className="font-medium text-yellow-800">{fallacy.name}:</p>
                  <p className="text-slate-600">{fallacy.description}</p>
                  <p className="mt-1 text-xs text-slate-500 italic">Improvement: {fallacy.improvement}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      <div className="bg-primary p-4 text-white rounded-t-md flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2 p-2 text-white hover:bg-primary/80">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">{topic}</h2>
          <p className="text-sm text-primary-foreground/80">
            You are arguing <span className="font-medium">{userPosition === 'for' ? 'in favor of' : 'against'}</span> this topic
          </p>
        </div>
      </div>
      
      <CardContent className="flex-grow p-0 flex flex-col overflow-hidden">
        <div className="p-4 bg-debate-background flex items-center space-x-2 border-b">
          <Info className="h-4 w-4 text-debate-neutral" />
          <p className="text-sm text-debate-neutral">
            The AI will take the opposite position and challenge your arguments to help you improve.
          </p>
        </div>
        
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-md ${message.sender === 'user' ? 'debate-message-user' : 'debate-message-ai'}`}
              >
                <p className="text-sm font-semibold mb-1">
                  {message.sender === 'user' ? 'You' : 'AI Opponent'}
                </p>
                <div className="text-slate-700">
                  {message.content}
                </div>
                {message.sender === 'user' && renderFallacyBadge(message)}
              </div>
            ))}
            
            {isAiTyping && (
              <div className="p-4 rounded-md debate-message-ai">
                <p className="text-sm font-semibold mb-1">AI Opponent</p>
                <div className="typing-indicator">Thinking</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <Textarea
              placeholder="Type your argument here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!userInput.trim() || isAiTyping}
              className="h-10 w-10 p-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebateInterface;
