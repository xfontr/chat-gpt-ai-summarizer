import useApp from "../hooks/useApp.js";
import { clearNode, updateNode } from "./renderUtils.js";

const parseDOMText = (): string => {
  const { unmount, mount } = useApp();

  unmount();

  const content = document?.body?.textContent || "";

  mount({ fromLastBackup: true });

  return content;
};

export default parseDOMText;
