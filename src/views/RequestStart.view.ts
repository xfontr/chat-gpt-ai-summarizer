import Button from "../components/Button.js";
import QueryFormatOptions from "../components/QueryFormatOptions.js";
import QueryOptions from "../components/QueryOptions.js";
import StackOptions from "../components/StackOptions.js";
import useAssistant from "../hooks/useAssistant.js";
import { useTokens } from "../stores/tokens.store.js";
import Query from "../types/Query.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import parseDOMText from "../utils/parseDOMText.js";
import { setBaseClass } from "../utils/setBaseClass.js";

let queryButtonBaseText = "Summarize page";

const baseClass = setBaseClass("request-start ai-layout");

const focusOn: string[] = [];

const RequestStartView = (): HTMLElement => {
  const { executeQuery } = useAssistant();
  const { calculateCost, hasEnoughTokens } = useTokens();

  const query = () =>
    parseDOMText(!!window.getSelection()?.toString()).split(" ").length;

  const queryButton = Button({
    textContent: queryButtonBaseText,
    onclick: () => executeQuery(queryRules()),
    variant: "fullWidth",
    className: "ai-query-button"
  });

  hasEnoughTokens(query()) && queryButton.setAttribute("disabled", "");

  const view = createElement("div", { className: baseClass });

  const options = createElement("div", {
    className: `${setBaseClass("request-start")}__options`
  });

  const footer = createElement("footer", {
    className: `${setBaseClass("request-start")}__footer`
  });

  const queryRules = (): Partial<Query["queryRules"]> => ({
    focusOn,
    getFromSelection: !!window.getSelection()?.toString()
  });

  const updateTokenCost = () => {
    queryButton.textContent = `${queryButtonBaseText} (~${calculateCost(
      query()
    )} t.)`;
  };

  updateTokenCost();

  const page = appendChildren(
    view,
    appendChildren(
      options,
      createElement("span", {
        textContent: "Summary length",
        className: "ai-form-field__label"
      }),
      QueryOptions({ handler: updateTokenCost }),
      StackOptions({ stack: focusOn })
    ),
    appendChildren(footer, queryButton, QueryFormatOptions())
  );

  document.addEventListener("mouseup", () => {
    setTimeout(() => {
      queryButtonBaseText = window.getSelection()?.toString()
        ? "Summarize selected text"
        : "Summarize page";

      queryButton.textContent = queryButtonBaseText;

      updateTokenCost();

      if (!hasEnoughTokens(query())) {
        queryButton.setAttribute("disabled", "");
        return;
      }

      queryButton.removeAttribute("disabled");
    });
  });

  return page;
};

export default RequestStartView;
