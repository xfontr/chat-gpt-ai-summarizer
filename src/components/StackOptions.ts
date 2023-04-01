import ChangeEvent from "../types/ChangeEvent.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { clearNode } from "../utils/renderUtils.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import Button from "./Button.js";
import FormField from "./FormField.js";
import Tag from "./Tag.js";

type StackOptionsProps = {
  stack: string[];
};

const baseClass = setBaseClass("stack-options");

let inputValue = "";

const StackOptions = ({ stack }: StackOptionsProps): HTMLElement => {
  const stackOptions = createElement("div", { className: baseClass });
  const tagList = createElement("div", {
    className: `${baseClass}__tags`,
  });
  const noTagsMessage = createElement("span", {
    textContent: 'Write a keyword and press "add"',
    className: `${baseClass}__tags--empty`,
  });

  const deleteItem = (item: string) => () => {
    const position = stack.findIndex((stackItem) => stackItem === item);
    stack.splice(position, 1);
    if (!stack.length && noTagsMessage) noTagsMessage.style.display = "block";
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (stack.includes(inputValue) || !inputValue) return;

    stack.push(inputValue);

    if (stack.length && noTagsMessage) noTagsMessage.style.display = "none";

    appendChildren(
      tagList,
      Tag({
        textContent: inputValue,
        onClose: deleteItem(inputValue),
      })
    );
  };

  const stackOptionsForm = createElement("form", {
    className: `${baseClass}__form`,
    onsubmit: handleSubmit,
  });

  const input = FormField({
    label: "Keywords",
    inputProps: {
      type: "text",
      onchange: (event: ChangeEvent) => {
        inputValue = event.currentTarget.value;
        event.currentTarget.value = "";
      },
      placeholder: "Inflation",
    },
  });

  const button = Button({
    textContent: "Add",
  });

  const renderStack = () => {
    if (stack.length) noTagsMessage.remove();
    return stack.map((item) =>
      Tag({
        textContent: item,
        onClose: deleteItem(item),
      })
    );
  };

  const form = appendChildren(stackOptionsForm, input, button);
  const tags = appendChildren(
    tagList,
    stack.length ? undefined : noTagsMessage,
    ...renderStack()
  );

  return appendChildren(stackOptions, form, tags);
};

export default StackOptions;
