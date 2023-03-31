import { getApp } from "../index.js";
import { queryBuildMiddleware } from "../stores/query.store.js";
import createElement from "../utils/createElement.js";
import parseDOMText from "../utils/parseDOMText.js";
import { updateNode } from "../utils/renderUtils.js";
import RequestCompleteView from "../views/RequestComplete.view.js";

const useAssistant = () => {
  const app = getApp();

  const executeQuery = async (): Promise<void> => {
    updateNode(app, createElement("p", { textContent: "Loading..." }));

    const query = queryBuildMiddleware(parseDOMText());

    // const response = await aiRequestMiddleware(query);

    updateNode(app, RequestCompleteView(query));
  };

  return { executeQuery };
};

export default useAssistant;
