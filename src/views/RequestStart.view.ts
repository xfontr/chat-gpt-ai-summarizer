import Button from "../components/Button.js";
import useAssistant from "../hooks/useAssistant.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";

const RequestStartView = (): HTMLElement => {
  const { executeQuery } = useAssistant();

  const view = createElement("div", { className: "request-start" });

  return appendChildren(
    view,
    Button({ textContent: "Summarize", onclick: executeQuery }, "fullWidth")
  );
};

export default RequestStartView;
