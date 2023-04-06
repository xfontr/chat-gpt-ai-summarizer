import appendChildren from "./appendChildren.js";
import { $ } from "./querySelector.js";

const injectHTML = (node: HTMLElement): void => {
  appendChildren($(".root"), node);
};

export default injectHTML;
