import Layout from "../components/Layout.js";
import Spinner from "../components/Spinner.js";
import {
  CLOSE_TO_QUERY_MAX_LENGTH,
  MAX_QUERIES_PER_PAGE,
  QUERY_MAX_LENGTH,
} from "../configs/constants.js";
import { aiRequestMiddleware } from "../services/requestAI.js";
import { useApiKey } from "../stores/apiKey.store.js";
import { useQuery } from "../stores/query.store.js";
import { useTokens } from "../stores/tokens.store.js";
import Query from "../types/Query.js";
import parseDOMText from "../utils/parseDOMText.js";
import queryBodyLength from "../utils/queryBodyLength.js";
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
    const { getApiKey } = useApiKey();

    setRules(rules);

    const DOMText = await parseDOMText();

    const pageWords = DOMText.split(" ");

    const actualQueryBody = queryBodyLength(pageWords.length, DOMText);
    const words = actualQueryBody.split(" ");

    if (
      (!getApiKey() && !hasEnoughTokens(words.length)) ||
      !words ||
      !words.length
    ) {
      updateNode(
        app,
        Layout({ addChildren: RequestCompleteView({ hasError: true }) })
      );
      return;
    }

    updateNode(app, Spinner());

    const fragments =
      words.length < CLOSE_TO_QUERY_MAX_LENGTH
        ? 1
        : Math.ceil(words.length / QUERY_MAX_LENGTH);

    const query =
      fragments === 1
        ? [words.join(" ")]
        : new Array(fragments)
            .fill(QUERY_MAX_LENGTH)
            .map((maxLength, index) =>
              words.slice(index * maxLength, (index + 1) * maxLength).join(" ")
            )
            .slice(0, MAX_QUERIES_PER_PAGE);

    if (!query || !query.length || !query[0]) {
      updateNode(
        app,
        Layout({ addChildren: RequestCompleteView({ hasError: true }) })
      );
      return;
    }

    const response = await aiRequestMiddleware(query);

    if (typeof response !== "string") {
      updateNode(
        app,
        Layout({ addChildren: RequestCompleteView({ hasError: true }) })
      );
      return;
    }

    updateNode(app, Layout({ addChildren: RequestCompleteView({ response }) }));
  };

  return { executeQuery };
};

export default useAssistant;
