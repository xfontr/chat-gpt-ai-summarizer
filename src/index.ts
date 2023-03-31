import App from "./components/App.js";
import useApp from "./hooks/useApp.js";
import appendChildren from "./utils/appendChildren.js";
import injectHTML from "./utils/injectHTML.js";
import RequestStartView from "./views/RequestStart.view.js";

const main = () => {
  const { mount, getApp } = useApp();

  mount();

  appendChildren(getApp(), RequestStartView());
};

main();
