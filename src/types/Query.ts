export type QueryMaxLengthCount = "characters" | "words";
export type ResponseFormat = "bulletPoints" | "summary";

export type Query = {
  queryRules: {
    responseMaxLength: number;
    focusOn: string[];
    maxLengthCount: QueryMaxLengthCount;
    responseFormat: ResponseFormat;
    getFromSelection: boolean;
  };
  pageContent: string;
  query: string;
};

export default Query;
