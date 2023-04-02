import Query, { QueryMaxLengthCount } from "../types/Query";
import { Temperature } from "../types/openai";

const models = Object.freeze({
  chat: "gpt-3.5-turbo",
  completion: "text-davinci-003",
});

export const MODEL = models.chat;

export const TEMPERATURE: Temperature = 0.4;

export const SUMMARY_MIN_LENGTH: Record<QueryMaxLengthCount, number> = {
  characters: 300,
  words: 30,
};

export const DEFAULT_PARSE: Query["queryRules"]["getFromSelection"] = false;

/** When changed, must update css selectors */
export const CLASS_PREFIX = "ai";

export const ENDPOINTS = {
  aiCompletion: "/completions",
};

/** Count in words */
export const QUERY_MAX_LENGTH: number = 1000;

export const MAX_QUERIES_PER_PAGE: number = 2;
