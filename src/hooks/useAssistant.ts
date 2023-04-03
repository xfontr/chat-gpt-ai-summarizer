import Spinner from "../components/Spinner.js";
import {
  MAX_QUERIES_PER_PAGE,
  QUERY_MAX_LENGTH,
} from "../configs/constants.js";
import { aiRequestMiddleware } from "../services/requestAI.js";
import { useQuery } from "../stores/query.store.js";
import { useTokens } from "../stores/tokens.store.js";
import Query from "../types/Query.js";
import parseDOMText from "../utils/parseDOMText.js";
import { updateNode } from "../utils/renderUtils.js";
import RequestCompleteView from "../views/RequestComplete.view.js";
import useApp from "./useApp.js";

const useAssistant = () => {
  const { getApp } = useApp();
  const app = getApp();

  const setRules = (
    rules: Partial<Query["queryRules"]>
  ): Partial<Query["queryRules"]> => {
    const {
      setMaxLengthCount,
      setResponseMaxLength,
      setKeywords,
      setResponseFormat,
      setQuerySource,
      getQueryRules,
    } = useQuery();

    if (rules.maxLengthCount) setMaxLengthCount(rules.maxLengthCount);
    if (rules.responseMaxLength) setResponseMaxLength(rules.responseMaxLength);
    if (rules.focusOn?.length) setKeywords(rules.focusOn);
    if (rules.responseFormat) setResponseFormat(rules.responseFormat);
    if (rules.getFromSelection) setQuerySource(rules.getFromSelection);

    return getQueryRules();
  };

  const executeQuery = async (
    rules: Partial<Query["queryRules"]>
  ): Promise<void> => {
    const { hasEnoughTokens } = useTokens();

    const { getFromSelection } = setRules(rules);

    const DOMText = parseDOMText(!!getFromSelection);

    const words = DOMText.split(" ");

    if (!hasEnoughTokens(words.length)) {
      return;
    }

    updateNode(app, Spinner());

    const fragments = Math.ceil(words.length / QUERY_MAX_LENGTH);

    const query = new Array(fragments)
      .fill(QUERY_MAX_LENGTH)
      .map((maxLength, index) =>
        words.slice(index * maxLength, (index + 1) * maxLength).join(" ")
      )
      .slice(0, MAX_QUERIES_PER_PAGE) ?? [""];

    if (!DOMText) return;

    const response = await aiRequestMiddleware(query);

    if (typeof response !== "string") {
      return;
    }

    updateNode(app, RequestCompleteView(response));
  };

  return { executeQuery };
};

export default useAssistant;
