import { CreateChatCompletionRequest } from "openai";
import Message from "../utils/Message.js";
import { ChatCompletionRequestMessage } from "../types/openai.js";

let messages: CreateChatCompletionRequest["messages"] = [];

export const messagesStore = () => {
  const getAllMessages = (): typeof messages => [...messages];

  const addMessage = (
    role: ChatCompletionRequestMessage["role"],
    content: ChatCompletionRequestMessage["content"]
  ): void => {
    messages.push(Message(role, content));
  };

  const resetMessages = (): void => {
    messages = [];
  };

  return () => ({
    getAllMessages,
    addMessage,
    resetMessages,
  });
};

export const useMessages = messagesStore();
