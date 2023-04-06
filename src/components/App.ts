import captureEvent from "../utils/captureEvent.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("summarizer-app");

const App = (): HTMLElement => {
  const app = createElement("div", { className: baseClass });

  app.addEventListener("mouseup", captureEvent("mouseup"), true);

  return app;
};

export default App;
