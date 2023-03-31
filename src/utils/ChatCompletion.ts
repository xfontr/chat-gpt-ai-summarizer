import { CreateChatCompletionRequest } from "openai";
import { MODEL } from "../configs/constants.js";

const ChatCompletion = (
  allMessages: CreateChatCompletionRequest["messages"]
): CreateChatCompletionRequest => ({
  model: MODEL,
  messages: allMessages,
});

export default ChatCompletion;
