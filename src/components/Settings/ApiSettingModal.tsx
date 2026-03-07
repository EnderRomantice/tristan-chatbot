import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ApiSettingModalProps {
    onClose: () => void;
}

export const ApiSettingModal: React.FC<ApiSettingModalProps> = ({ onClose }) => {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('DEEPSEEK_API_KEY');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('DEEPSEEK_API_KEY', apiKey.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-black/5 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center p-6 border-b border-black/5">
                    <h2 className="font-serif text-xl font-medium tracking-wide">Tristan Preferences</h2>
                    <button onClick={onClose} className="text-black/40 hover:text-black transition-colors rounded-full p-2 hover:bg-black/5">
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-black/70 mb-2 font-sans tracking-tight">
                                DeepSeek API Key
                            </label>
                            <input
                                id="apiKey"
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full px-4 py-3.5 bg-[#f5f5f7] border border-transparent rounded-2xl focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 outline-none transition-all font-sans text-black"
                                autoComplete="off"
                            />
                            <p className="mt-3 text-[13px] text-black/40 leading-relaxed font-sans">
                                Your key is stored securely in your browser's local storage and is only used to communicate with the DeepSeek API.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-2">
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3.5 rounded-2xl text-sm font-medium tracking-wide hover:bg-black/90 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                        >
                            Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
