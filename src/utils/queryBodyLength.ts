import {
  MAX_POSSIBLE_LENGTH,
  MIN_POSSIBLE_LENGTH,
  QUERY_LENGTH_TO_PAGE_RATIO,
} from "../configs/constants";

const queryBodyLength = (pageLength: number, body: string): string => {
  const updatedBody = body;
  const queryToPageRatio = pageLength * QUERY_LENGTH_TO_PAGE_RATIO;

  const maxLimit =
    queryToPageRatio > MAX_POSSIBLE_LENGTH
      ? MAX_POSSIBLE_LENGTH
      : queryToPageRatio;

  const limit = maxLimit > MIN_POSSIBLE_LENGTH ? maxLimit : MIN_POSSIBLE_LENGTH;

  return updatedBody.slice(0, limit);
};

export default queryBodyLength;
