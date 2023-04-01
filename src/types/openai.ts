export type ChatCompletionRequestMessage = {
  content: string;
  name?: string;
  role: "assistant" | "system" | "user";
};

export type ChatCompletionRequest = {
  messages: ChatCompletionRequestMessage[];
};

export type ChatCompletionResponse = {
  data: {
    choices: [
      {
        message: {
          content: string;
        };
      }
    ];
  };
};
