import { getEnvironmentKey } from "../services/chrome";

const ENVIRONMENT = {
  openaiApiKey: "",
  openaiApiURL: "https://api.openai.com/v1/chat",
  secret: "",
};

export const setEnvironment = () => {
  getEnvironmentKey("API_KEY", (response: string) => {
    ENVIRONMENT.openaiApiKey = response;
  });

  getEnvironmentKey("SECRET", (response: string) => {
    ENVIRONMENT.secret = response;
  });
};

export default ENVIRONMENT;
