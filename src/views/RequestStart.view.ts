import Button from "../components/Button.js";
import QueryOptions from "../components/QueryOptions.js";
import StackOptions from "../components/StackOptions.js";
import useAssistant from "../hooks/useAssistant.js";
import { useTokens } from "../stores/tokens.store.js";
import Query from "../types/Query.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import parseDOMText from "../utils/parseDOMText.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("request-start ai-layout");

const focusOn: string[] = [];

const RequestStartView = (): HTMLElement => {
  const { executeQuery } = useAssistant();
  // const { getQueryRules } = useQuery();
  const { getTokens, calculateCost, hasEnoughTokens } = useTokens();

  const query = () =>
    parseDOMText(!!window.getSelection()?.toString()).split(" ").length;

  const queryButton = Button({
    textContent: "Summarize page",
    onclick: () => executeQuery(queryRules()),
    variant: "fullWidth",
    className: "ai-query-button"
  });

  hasEnoughTokens(query()) && queryButton.setAttribute("disabled", "");

  // setForm({
  //   maxLengthCount: getQueryRules().maxLengthCount,
  //   responseMaxLength: getQueryRules().responseMaxLength,
  //   responseFormat: getQueryRules().responseFormat
  // });

  const view = createElement("div", { className: baseClass });

  const footer = createElement("footer", {
    className: `${setBaseClass("request-start")}__footer`
  });

  const tokensLeft = createElement("span", {
    textContent: "Tokens left: loading..."
  });

  const tokenCost = createElement("span", {
    textContent: `Estimated cost: ${calculateCost(
      parseDOMText(!!window.getSelection()?.toString()).split(" ").length
    )} tokens`
  });

  const queryRules = (): Partial<Query["queryRules"]> => ({
    // maxLengthCount: formValues.maxLengthCount as QueryMaxLengthCount,
    // responseMaxLength: +formValues.responseMaxLength || undefined,
    focusOn,
    // responseFormat: formValues.responseFormat as ResponseFormat,
    getFromSelection: !!window.getSelection()?.toString()
  });

  const page = appendChildren(
    view,
    tokensLeft,
    QueryOptions(),
    StackOptions({ stack: focusOn }),
    appendChildren(footer, queryButton, tokenCost)
  );

  document.addEventListener("mouseup", () => {
    setTimeout(() => {
      queryButton.textContent = window.getSelection()?.toString()
        ? "Summarize selected text"
        : "Summarize page";

      tokenCost.textContent = `Estimated cost: ${calculateCost(
        query()
      )} tokens`;

      if (!hasEnoughTokens(query())) {
        queryButton.setAttribute("disabled", "");
      } else {
        queryButton.removeAttribute("disabled");
      }
    });
  });

  getTokens().then(tokens => {
    tokensLeft.textContent = `Tokens left: ${tokens}`;
  });

  return page;
};

export default RequestStartView;
