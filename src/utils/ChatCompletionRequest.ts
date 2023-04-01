import { CreateChatCompletionRequest } from "openai";
import { MODEL, TEMPERATURE } from "../configs/constants.js";

const ChatCompletionRequest = (
  allMessages: CreateChatCompletionRequest["messages"]
): CreateChatCompletionRequest => ({
  model: MODEL,
  messages: allMessages,
  temperature: TEMPERATURE,
});

export default ChatCompletionRequest;
