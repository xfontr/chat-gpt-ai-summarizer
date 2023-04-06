import useApp from "../hooks/useApp";
import createElement from "../utils/createElement";
import { updateNode } from "../utils/renderUtils";

const chrome = ((): typeof globalThis.chrome | void => {
  const { getApp } = useApp();

  const windowChrome = window?.chrome;

  if (windowChrome) {
    return windowChrome;
  }

  updateNode(
    getApp(),
    createElement("span", {
      textContent: "Something went really, really wrong",
    })
  );
})();

export const browserAction = async <T = unknown>(action: Function) => {
  const [tab] = await chrome!.tabs.query({
    active: true,
    currentWindow: true,
  });

  let result;

  try {
    [{ result }] = await chrome!.scripting.executeScript<any[], T>({
      target: { tabId: tab.id! },
      func: () => action.bind(this).call(),
    });
  } catch (e) {
    return;
  }

  return result;
};

export default chrome;
