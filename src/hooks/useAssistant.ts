import Spinner from "../components/Spinner.js";
import { queryBuildMiddleware } from "../stores/query.store.js";
import parseDOMText from "../utils/parseDOMText.js";
import { updateNode } from "../utils/renderUtils.js";
import RequestCompleteView from "../views/RequestComplete.view.js";
import useApp from "./useApp.js";

const useAssistant = () => {
  const { getApp } = useApp();
  const app = getApp();

  const executeQuery = async (): Promise<void> => {
    updateNode(app, Spinner());

    const query = queryBuildMiddleware(parseDOMText());

    // const response = await aiRequestMiddleware(query);
    setTimeout(() => {
      updateNode(app, RequestCompleteView(query));
    }, 500);
  };

  return { executeQuery };
};

export default useAssistant;
