import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";
import Message from "../utils/Message.js";

const history: [string, string][] = [];
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

  const useMessages = () => ({
    getAllMessages,
    addMessage,
    resetMessages,
  });

  const getAllHistory = (): typeof history => [...history];

  const addHistory = (inputText: string, completionText: string) => {
    history.push([inputText, completionText]);
  };

  const useHistory = () => ({
    getAllHistory,
    addHistory,
  });

  return {
    useMessages,
    useHistory,
  };
};

export const { useHistory, useMessages } = messagesStore();
