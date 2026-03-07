import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 pb-8">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-end w-full border border-black/10 shadow-sm bg-white rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-black/20 focus-within:border-black/30 transition-all duration-300"
            >
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Tristan..."
                    className="w-full max-h-[200px] py-4 pl-4 pr-12 bg-transparent border-none focus:ring-0 resize-none outline-none font-sans text-base leading-relaxed placeholder:text-black/30"
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-3 bottom-3 p-1.5 rounded-full bg-black text-white disabled:bg-black/10 disabled:text-black/30 transition-colors"
                >
                    <ArrowUp size={18} strokeWidth={2} />
                </button>
            </form>
            <div className="text-center mt-3 text-xs text-black/40 font-sans tracking-wide">
                Tristan is a luxury conversational experience.
            </div>
        </div>
    );
};
