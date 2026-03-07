import React from 'react';
import { User } from 'lucide-react';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full py-6 px-4 md:px-0 ${isUser ? '' : 'bg-white/50 border-y border-black/5'}`}>
            <div className="max-w-3xl mx-auto flex gap-6 w-full font-sans">
                <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            <User size={16} strokeWidth={1.5} />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center bg-white">
                            <span className="font-serif text-black/80 font-semibold text-lg leading-none italic">T</span>
                        </div>
                    )}
                </div>
                <div className="prose prose-neutral max-w-none flex-1 leading-8 text-[#111] font-[400] whitespace-pre-wrap">
                    {message.content}
                </div>
            </div>
        </div>
    );
};
