export type Temperature = 0.2 | 0.3 | 0.4 | 0.5 | 0.6;

export type ChatCompletionRequestMessage = {
  content: string;
  name?: string;
  role: "assistant" | "system" | "user";
};

export type ChatCompletionRequest = {
  messages: ChatCompletionRequestMessage[];
  model: string;
  temperature: Temperature;
};

export type ChatCompletionResponse = {
  data: {
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    choices: [
      {
        message: {
          content: string;
        };
      }
    ];
  };
};
