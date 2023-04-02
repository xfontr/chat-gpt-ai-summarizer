import { MODEL, TEMPERATURE } from "../configs/constants.js";
import { ChatCompletionRequest as ICompletionRequest } from "../types/openai.js";

const ChatCompletionRequest = (
  messages: ICompletionRequest["messages"]
): ICompletionRequest => ({
  model: MODEL,
  messages,
  temperature: TEMPERATURE,
});

export default ChatCompletionRequest;
