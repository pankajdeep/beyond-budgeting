interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          isUser
            ? 'bg-primary text-secondary ml-4'
            : 'bg-secondary text-white mr-4'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};