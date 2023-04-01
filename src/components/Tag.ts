import HTMLAttributes from "../types/HTMLAttributes.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const baseClass = setBaseClass("tag");

const Tag = ({ textContent, onClose }: TagProps): HTMLElement => {
  const tag = createElement("div", { className: baseClass });
  const close = createElement("button", {
    textContent: "x",
    onclick: () => {
      tag.remove();
      onClose && onClose();
    },
    className: `${baseClass}__close`,
  });
  const content = createElement("span", { textContent });

  return appendChildren(tag, close, content);
};

export default Tag;
