import Button from "../components/Button.js";
import DataDisplay from "../components/DataDisplay.js";
import useApp from "../hooks/useApp.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { updateNode } from "../utils/renderUtils.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import RequestStartView from "./RequestStart.view.js";

const baseClass = setBaseClass("request-complete ai-layout");

const RequestCompleteView = (response: string): HTMLElement => {
  const { getApp } = useApp();
  const app = getApp();

  const view = createElement("div", { className: baseClass });
  const baseHeader = createElement("header", {
    className: "request-complete__header",
  });

  const resetButton = Button({
    textContent: "Reset",
    onclick: () => updateNode(app, RequestStartView()),
    variant: "fullWidth",
  });

  const header = appendChildren(baseHeader, resetButton);

  const dataDisplay = DataDisplay({ defaultValue: response });

  appendChildren(view, header, dataDisplay);

  return view;
};

export default RequestCompleteView;
