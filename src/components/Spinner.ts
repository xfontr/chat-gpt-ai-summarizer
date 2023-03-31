import createElement from "../utils/createElement";
import { setBaseClass } from "../utils/setBaseClass";

const baseClass = setBaseClass("ai-spinner");

const Spinner = (): HTMLElement =>
  createElement("div", { className: baseClass });

export default Spinner;
