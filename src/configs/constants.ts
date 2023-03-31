import { QueryMaxLengthCount } from "../types/Query";

export const MODEL = "gpt-3.5-turbo";

export const SUMMARY_MIN_LENGTH: Record<QueryMaxLengthCount, number> = {
  characters: 300,
  words: 15,
};

/** When changed, must update css selectors */
export const CLASS_PREFIX = "ai";

export default MODEL;
