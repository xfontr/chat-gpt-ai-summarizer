export type QueryMaxLengthCount = "characters" | "words";

export type Query = {
  queryRules: {
    responseMaxLength: number;
    focusOn: string[];
    maxLengthCount: QueryMaxLengthCount;
  };
  pageContent: string;
  query: string;
};

export default Query;
