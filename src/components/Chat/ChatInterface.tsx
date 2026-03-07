import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble, type Message } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Settings } from 'lucide-react';
import { ApiSettingModal } from '../Settings/ApiSettingModal';
import { sendMessageToDeepSeek } from '../../services/api';

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Good evening. I am Tristan. How may I assist you today?'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (content: string) => {
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            // Create message history for API
            const messageHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            messageHistory.push({ role: 'user', content });

            const responseContent = await sendMessageToDeepSeek(messageHistory);

            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseContent
            };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error: any) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I apologize, but I encountered an error: ${error.message || 'Unknown error'}. Please check your API key in settings.`
            };
            setMessages(prev => [...prev, errorMessage]);

            if (error.message?.includes('API key')) {
                setIsSettingsOpen(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#fafafa]">
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-xl border-b border-black/5 z-10 sticky top-0">
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-black flex items-center gap-2">
                    Tristan.
                </h1>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"
                    title="Settings"
                >
                    <Settings size={20} strokeWidth={1.5} />
                </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto scroll-smooth">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {isLoading && (
                    <div className="flex w-full py-6 px-4 md:px-0 bg-white/50 border-y border-black/5">
                        <div className="max-w-3xl mx-auto flex gap-6 w-full font-sans">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center bg-white">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center pt-2">
                                <div className="flex space-x-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-6" />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent pt-8">
                <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <ApiSettingModal onClose={() => setIsSettingsOpen(false)} />
            )}
        </div>
    );
};
