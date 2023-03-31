import app, { getApp } from "../index.js";
import { clearNode } from "./renderUtils.js";

const parseDOMText = (): string => {
  const appBackup = app.innerHTML;
  clearNode(app);

  const content = document?.body?.textContent || "";

  getApp().innerHTML = appBackup;

  return content;
};

export default parseDOMText;
