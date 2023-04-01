import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import Button from "./Button.js";

const baseClass = setBaseClass("summarizer-app");

const App = (): HTMLElement => {
  const app = createElement("div", { className: baseClass });
  const content = createElement("div", { className: `${baseClass}__content` });
  // const close = createElement("div", {
  //   className: `${baseClass}__close`,
  // });
  const close = Button({
    textContent: "X",
    className: `${baseClass}__close`,
    onclick: () => (app.outerHTML = ""),
    variant: "iconOnly",
  });

  // appendChildren(close, closeButton);

  return appendChildren(app, content, close);
};

export default App;
