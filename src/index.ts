import App from "./components/App.js";
import appendChildren from "./utils/appendChildren.js";
import injectHTML from "./utils/injectHTML.js";
import { $ } from "./utils/querySelector.js";
import RequestStartView from "./views/RequestStart.view.js";

const app = App();

export const getApp = (): HTMLElement => $(".summarizer-app") as HTMLElement;

const main = () => {
  injectHTML(app);
  appendChildren(app, RequestStartView());
};

main();

export default app;
