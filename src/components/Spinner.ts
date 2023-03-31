import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("spinner");

const Spinner = (): HTMLElement => {
  const center = createElement("div", { className: `${baseClass}-container` });
  const spinner = createElement("div", { className: baseClass });

  return appendChildren(center, spinner);
};

export default Spinner;
