import { QueryMaxLengthCount } from "../types/Query";

export const MODEL = "gpt-3.5-turbo";

export const TEMPERATURE: 0.2 | 0.3 | 0.4 | 0.5 | 0.6 = 0.4;

export const SUMMARY_MIN_LENGTH: Record<QueryMaxLengthCount, number> = {
  characters: 300,
  words: 60,
};

/** When changed, must update css selectors */
export const CLASS_PREFIX = "ai";

export const ENDPOINTS = {
  aiCompletion: "/completions",
};
