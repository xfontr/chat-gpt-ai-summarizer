import { useTokens } from "../stores/tokens.store";
import HTMLAttributes from "../types/HTMLAttributes";
import appendChildren from "../utils/appendChildren";
import createElement from "../utils/createElement";
import { setBaseClass } from "../utils/setBaseClass";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  addChildren: HTMLElement;
}

const baseClass = setBaseClass("main-container");

const Layout = ({ addChildren, ...rest }: LayoutProps): HTMLElement => {
  const { getTokens } = useTokens();

  const header = createElement("header", {
    ...rest,
    className: `${baseClass}__header`,
  });

  const tokensLeft = createElement("span", {
    textContent: "Tokens left: loading...",
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
    appendChildren(header, tokensLeft, infoSection),
    addChildren
  );
};

export default Layout;
