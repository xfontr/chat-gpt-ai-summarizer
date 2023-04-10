import { useApiKey } from "../stores/apiKey.store";
import { useTokens } from "../stores/tokens.store";
import HTMLAttributes from "../types/HTMLAttributes";
import appendChildren from "../utils/appendChildren";
import createElement from "../utils/createElement";
import { $ } from "../utils/querySelector";
import { replaceNode } from "../utils/renderUtils";
import { setBaseClass } from "../utils/setBaseClass";
import ApiKeyView from "../views/ApiKey.view";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  addChildren: HTMLElement;
}

const baseClass = setBaseClass("main-container");

const Layout = ({ addChildren, ...rest }: LayoutProps): HTMLElement => {
  const { getTokens } = useTokens();
  const { getApiKey } = useApiKey();

  const header = createElement("header", {
    ...rest,
    className: `${baseClass}__header`,
  });

  const connectedToApiKey = createElement("span", {
    textContent: "Connected to your API key",
  });

  const tokensLeft = createElement("span", {
    textContent: "Tokens left: loading...",
  });

  const addTokens = createElement("button", {
    textContent: getApiKey() ? "| Manage" : "| Add tokens (free)",
    className: `${baseClass}__add-tokens`,
    onclick: (event: Event) => {
      event.preventDefault();
      replaceNode($(".ai-request-start.ai-layout"), ApiKeyView());
    },
  });

  const infoSection = createElement("i", {
    textContent: "i",
    className: `${baseClass}__info`,
  });

  getTokens().then((tokens) => {
    tokensLeft.textContent = `Tokens left: ${tokens}`;
  });

  return appendChildren(
    createElement("div", { className: baseClass }),
    appendChildren(
      header,
      appendChildren(
        createElement("div", { className: `${baseClass}__token-info` }),
        getApiKey() ? connectedToApiKey : tokensLeft,
        addTokens
      ),
      infoSection
    ),
    addChildren
  );
};

export default Layout;
