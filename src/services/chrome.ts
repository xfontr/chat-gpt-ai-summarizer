import Layout from "../components/Layout";
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
    Layout({
      addChildren: createElement("span", {
        textContent: "Something went really, really wrong",
      }),
    })
  );
})();

export const getWindowText = async () => {
  const [tab] = await chrome!.tabs.query({
    active: true,
    currentWindow: true,
  });

  let result;

  try {
    [{ result }] = await chrome!.scripting.executeScript<any[], string | null>({
      target: { tabId: tab.id! },
      func: () => document.body.innerText,
    });
  } catch (e) {
    return;
  }

  return result;
};

export const getWindowSelection = async () => {
  const [tab] = await chrome!.tabs.query({
    active: true,
    currentWindow: true,
  });

  let result;

  try {
    [{ result }] = await chrome!.scripting.executeScript<
      any[],
      string | undefined
    >({
      target: { tabId: tab.id! },
      func: () => getSelection()?.toString(),
    });
  } catch (e) {
    return;
  }

  return result;
};

export const openLink = (event: any) => {
  chrome!.tabs.create({ url: event.target?.href });
};

export default chrome;
