import OpenAI from 'openai';

export const sendMessageToDeepSeek = async (
    messages: { role: 'user' | 'assistant' | 'system', content: string }[]
): Promise<string> => {
    const apiKey = localStorage.getItem('DEEPSEEK_API_KEY');

    if (!apiKey) {
        throw new Error('API key not found. Please set your DeepSeek API key in the settings.');
    }

    // DeepSeek API is compatible with OpenAI SDK
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Required for client-side execution
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'You are Tristan, an elegant, highly intelligent, and polite AI assistant. You have a minimalist, refined, and sophisticated conversational style. Keep your responses concise, thoughtful, and well-structured. You represent luxury and prestige.'
                },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 2048,
        });

        return response.choices[0].message.content || 'I apologize, I am unable to provide a response at this moment.';
    } catch (error: any) {
        console.error('DeepSeek API Error:', error);
        if (error.status === 401) {
            throw new Error('Invalid API key. Please check your configuration.');
        }
        throw new Error(error.message || 'Failed to connect to the AI service.');
    }
};
