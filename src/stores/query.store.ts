import { SUMMARY_MIN_LENGTH } from "../configs/constants.js";
import Query, { QueryMaxLengthCount } from "../types/Query.js";

const query: Query = {
  pageContent: "",
  queryRules: {
    focusOn: [],
    responseMaxLength: 100,
    maxLengthCount: "words",
  },
  query: "",
};

const queryStore = () => {
  const setResponseMaxLength = (maxLength: number): void => {
    query.queryRules.responseMaxLength =
      maxLength < SUMMARY_MIN_LENGTH[query.queryRules.maxLengthCount]
        ? SUMMARY_MIN_LENGTH[query.queryRules.maxLengthCount]
        : maxLength;
  };

  const setMaxLengthCount = (maxLengthCount: QueryMaxLengthCount): void => {
    query.queryRules.maxLengthCount = maxLengthCount;
  };

  const setPageContent = (pageContent: string): void => {
    query.pageContent = pageContent;
  };

  const buildQuery = (): void => {
    const maxLength = `${query.queryRules.responseMaxLength} ${query.queryRules.maxLengthCount}`;
    const keywords = query.queryRules.focusOn.join(", ");

    let baseQuery = `I want you to summarize me a text. Your response (the summary) must have a maximum of ${maxLength}.`;

    baseQuery = query.queryRules.focusOn.length
      ? `${baseQuery} While summarizing, you'll have to focus on the following keywords: ${keywords}.`
      : baseQuery;

    query.query = `${baseQuery} The text I need you to summarize with the previous requirements is the following one:
    ${query.pageContent}`;
  };

  const getQuery = (): string => query.query;

  return () => ({
    setResponseMaxLength,
    setMaxLengthCount,
    setPageContent,
    buildQuery,
    getQuery,
  });
};

export const useQuery = queryStore();

export const queryBuildMiddleware = (pageContent: string): string => {
  const { buildQuery, getQuery, setPageContent } = useQuery();

  setPageContent(pageContent);
  buildQuery();
  return getQuery();
};
