import appendChildren from "./appendChildren.js";

const injectHTML = (node: HTMLElement): void => {
  appendChildren(document.body, node);
};

export default injectHTML;
