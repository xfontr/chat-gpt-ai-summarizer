import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("summarizer-app");

const App = (): HTMLElement => createElement("div", { className: baseClass });

export default App;
