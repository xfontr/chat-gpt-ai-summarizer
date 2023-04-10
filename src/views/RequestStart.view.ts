import Button from "../components/Button.js";
import QueryFormatOptions from "../components/QueryFormatOptions.js";
import QueryOptions from "../components/QueryOptions.js";
import StackOptions from "../components/StackOptions.js";
import useAssistant from "../hooks/useAssistant.js";
import { getWindowSelection } from "../services/chrome.js";
import { useTokens } from "../stores/tokens.store.js";
import Query from "../types/Query.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import parseDOMText from "../utils/parseDOMText.js";
import { setBaseClass } from "../utils/setBaseClass.js";

let queryButtonBaseText = "Summarize page";

export const query = async () => {
  const parsedDOM = await parseDOMText();
  return parsedDOM.split(" ").length;
};

const baseClass = setBaseClass("request-start ai-layout");

const focusOn: string[] = [];

const RequestStartView = (): HTMLElement => {
  const { executeQuery } = useAssistant();
  const { calculateCost } = useTokens();

  const queryButton = Button({
    textContent: queryButtonBaseText,
    onclick: () => executeQuery(queryRules()),
    variant: "fullWidth",
    className: `ai-query-button ${setBaseClass("request-start")}__submit`,
  });

  getWindowSelection().then((res) => {
    queryButtonBaseText = !!res ? "Summarize selection" : "Summarize page";
    queryButton.textContent = queryButtonBaseText;
  });

  const TokenCost = (cost: number) =>
    createElement("span", {
      textContent: `~${calculateCost(cost)} t.`,
      className: `${setBaseClass("request-start")}__token-cost`,
    });

  const updateTokenCost = (queryLength: number) => {
    queryButton.innerHTML = `${queryButtonBaseText}${
      TokenCost(queryLength).outerHTML
    }`;
  };

  query().then((res) => {
    updateTokenCost(res);
  });

  const view = createElement("div", { className: baseClass });

  const options = createElement("div", {
    className: `${setBaseClass("request-start")}__options`,
  });

  const footer = createElement("footer", {
    className: `${setBaseClass("request-start")}__footer`,
  });

  const queryRules = (): Partial<Query["queryRules"]> => ({
    focusOn,
    getFromSelection: !!window.getSelection()?.toString(),
  });

  const page = appendChildren(
    view,
    appendChildren(
      options,
      createElement("span", {
        textContent: "Summary length",
        className: "ai-form-field__label",
      }),
      QueryOptions({ handler: updateTokenCost }),
      StackOptions({ stack: focusOn })
    ),
    appendChildren(footer, queryButton, QueryFormatOptions())
  );

  return page;
};

export default RequestStartView;
