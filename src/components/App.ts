import appendChildren from "../utils/appendChildren.js";
import captureEvent from "../utils/captureEvent.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import Button from "./Button.js";

const baseClass = setBaseClass("summarizer-app");

const App = (): HTMLElement => {
  const app = createElement("div", { className: baseClass });
  const content = createElement("div", { className: `${baseClass}__content` });

  const close = Button({
    textContent: "X",
    className: `${baseClass}__close`,
    onclick: () => (app.outerHTML = ""),
    variant: "iconOnly",
  });

  app.addEventListener("mouseup", captureEvent("mouseup"), true);

  return appendChildren(app, content, close);
};

export default App;
