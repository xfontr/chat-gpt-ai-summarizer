import Spinner from "../components/Spinner.js";
import {
  DEFAULT_PARSE,
  MAX_QUERIES_PER_PAGE,
  QUERY_MAX_LENGTH,
} from "../configs/constants.js";
import { aiRequestMiddleware } from "../services/requestAI.js";
import { useQuery } from "../stores/query.store.js";
import Query from "../types/Query.js";
import parseDOMText from "../utils/parseDOMText.js";
import { updateNode } from "../utils/renderUtils.js";
import RequestCompleteView from "../views/RequestComplete.view.js";
import useApp from "./useApp.js";

const useAssistant = () => {
  const { getApp } = useApp();
  const app = getApp();

  const setRules = (rules?: Partial<Query["queryRules"]>) => {
    const {
      setMaxLengthCount,
      setResponseMaxLength,
      setKeywords,
      setResponseFormat,
    } = useQuery();

    if (!rules) return;
    if (rules.maxLengthCount) setMaxLengthCount(rules.maxLengthCount);
    if (rules.responseMaxLength) setResponseMaxLength(rules.responseMaxLength);
    if (rules.focusOn?.length) setKeywords(rules.focusOn);
    if (rules.responseFormat) setResponseFormat(rules.responseFormat);
  };

  const executeQuery = async (
    rules?: Partial<Query["queryRules"]>
  ): Promise<void> => {
    updateNode(app, Spinner());
    setRules(rules);

    const DOMText = parseDOMText(rules?.getFromSelection ?? DEFAULT_PARSE);

    const words = DOMText.split(" ");
    const fragments = Math.ceil(words.length / QUERY_MAX_LENGTH);

    const query = new Array(fragments)
      .fill(QUERY_MAX_LENGTH)
      .map((maxLength, index) =>
        words.slice(index * maxLength, (index + 1) * maxLength).join(" ")
      )
      .slice(0, MAX_QUERIES_PER_PAGE) ?? [""];

    if (!DOMText) return;

    const response = await aiRequestMiddleware(query);

    updateNode(app, RequestCompleteView(response));
  };

  return { executeQuery };
};

export default useAssistant;
