import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("spinner");

const Spinner = (): HTMLElement => {
  const center = createElement("div", { className: `${baseClass}-container` });
  const spinner = createElement("div", { className: baseClass });
  const estimatedTime = createElement("p", {
    textContent: "Please, wait 😀 Est. time: 1 min.",
  });

  return appendChildren(center, spinner, estimatedTime);
};

export default Spinner;
