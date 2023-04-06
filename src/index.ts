import Layout from "./components/Layout.js";
import useApp from "./hooks/useApp.js";
import appendChildren from "./utils/appendChildren.js";
import RequestStartView from "./views/RequestStart.view.js";

const main = async () => {
  const { init, getApp } = useApp();

  await init();

  appendChildren(getApp(), Layout({ addChildren: RequestStartView() }));
};

main();
