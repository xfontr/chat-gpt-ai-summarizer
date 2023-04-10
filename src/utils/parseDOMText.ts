import { getWindowSelection, getWindowText } from "../services/chrome.js";

const parseDOMText = async (): Promise<string> => {
  const selectedContent = await getWindowSelection();

  if (selectedContent) return selectedContent.replaceAll(/\s/g, " ");

  const windowContent = await getWindowText();

  return windowContent?.replaceAll(/\s/g, " ") ?? "";
};

export default parseDOMText;
