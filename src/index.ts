import Layout from "./components/Layout.js";
import useApp from "./hooks/useApp.js";
import appendChildren from "./utils/appendChildren.js";
import RequestStartView from "./views/RequestStart.view.js";

const main = async () => {
  const { init, getApp } = useApp();
  // const { getApiKey } = useApiKey();

  await init();
  // const apiKey = getApiKey();

  appendChildren(
    getApp(),
    // Layout({ addChildren: apiKey ? RequestStartView() : ApiKeyView() })
    Layout({ addChildren: RequestStartView() })
  );
};

main();
