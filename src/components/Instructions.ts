import appendChildren from "../utils/appendChildren";
import createElement from "../utils/createElement";
import { setBaseClass } from "../utils/setBaseClass";

type InstructionsProps = {
  instructions: (HTMLElement | string)[];
};

const baseClass = setBaseClass("instructions");

const Instructions = ({ instructions }: InstructionsProps): HTMLElement => {
  const list = createElement("ol", { className: baseClass });

  instructions.forEach((step) => {
    appendChildren(
      list,
      appendChildren(
        createElement("li", {
          className: `${baseClass}__step`,
          textContent: typeof step === "string" ? step : "",
        }),
        typeof step !== "string" ? step : undefined
      )
    );
  });

  return list;
};

export default Instructions;
