import { useState, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Mock function to simulate AI responses
const mockAIResponse = async (message: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return `This is a mock response to: "${message}"`;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        // Get AI response
        const aiResponse = await mockAIResponse(userMessage.content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
        // Optionally, add an error message to the chat
      } finally {
        setIsLoading(false);
      }
    },
    [input]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
