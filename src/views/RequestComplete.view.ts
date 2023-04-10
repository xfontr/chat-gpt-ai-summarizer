import Button from "../components/Button.js";
import DataDisplay from "../components/DataDisplay.js";
import Layout from "../components/Layout.js";
import useApp from "../hooks/useApp.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { updateNode } from "../utils/renderUtils.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import RequestStartView from "./RequestStart.view.js";

type RequestResponseViewProps = {
  response?: string;
  hasError?: boolean;
};

const baseClass = setBaseClass("request-complete ai-layout");

const RequestCompleteView = ({
  response,
  hasError = false,
}: RequestResponseViewProps): HTMLElement => {
  const { getApp } = useApp();
  const app = getApp();

  const view = createElement("div", { className: baseClass });

  const resetButton = Button({
    textContent: "Reset",
    onclick: () => updateNode(app, Layout({ addChildren: RequestStartView() })),
    variant: "fullWidth",
  });

  if (hasError) {
    return appendChildren(
      view,
      appendChildren(
        createElement("div"),
        createElement("span", { textContent: "Something went wrong" }),
        resetButton
      )
    );
  }

  const baseHeader = createElement("header", {
    className: "request-complete__header",
  });

  const header = appendChildren(baseHeader, resetButton);

  const dataDisplay = DataDisplay({ defaultValue: response });

  appendChildren(view, dataDisplay, header);

  return view;
};

export default RequestCompleteView;
