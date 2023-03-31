import { ChatCompletionRequestMessage } from "openai";

const Message = (
  role: ChatCompletionRequestMessage["role"],
  content: ChatCompletionRequestMessage["content"]
): ChatCompletionRequestMessage => ({ role, content });

export default Message;
