import models from "../data/models";
import { QueryMaxLengthCount } from "../types/Query";
import { Temperature } from "../types/openai";

export const MODEL = models.chat;

export const TEMPERATURE: Temperature = 0.4;

export const SUMMARY_MIN_LENGTH: Record<QueryMaxLengthCount, number> = {
  characters: 300,
  words: 30,
};

/** When changed, must update css selectors */
export const CLASS_PREFIX = "ai";

export const ENDPOINTS = {
  aiCompletion: "/completions",
  apiKey: "https://platform.openai.com/account/api-keys",
  verifyApiKey: "https://api.openai.com/v1/engines",
};

/** Count in words */
export const QUERY_MAX_LENGTH = 1_000;

/** 1.300 words */
export const CLOSE_TO_QUERY_MAX_LENGTH = QUERY_MAX_LENGTH + 300;

export const MAX_QUERIES_PER_PAGE = 2;

/** 2.000 */
export const MAX_POSSIBLE_LENGTH = QUERY_MAX_LENGTH * MAX_QUERIES_PER_PAGE;

export const MIN_POSSIBLE_LENGTH = 700;

export const QUERY_LENGTH_TO_PAGE_RATIO = 0.33;

export const AVAILABLE_TOKENS = 10_000;

export const TOKENS_PER_WORD = 2.5;

export const MINIMUM_TOKENS = 150;
