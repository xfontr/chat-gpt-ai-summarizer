import HTMLAttributes from "../types/HTMLAttributes";
import createElement from "../utils/createElement.js";
import { baseSetBaseClass, setBaseClass } from "../utils/setBaseClass.js";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const baseClass = setBaseClass("button");

const variants = {
  fullWidth: `${baseClass}--full-width`,
  iconOnly: `${baseClass}--icon-only`,
};

const Button = (props: ButtonProps = {}, variant?: keyof typeof variants) =>
  createElement("button", {
    className: `${baseClass} ${variants[variant] ? variants[variant] : ""}`,
    ...props,
  });

export default Button;
