import HTMLAttributes from "../types/HTMLAttributes";
import createElement from "../utils/createElement.js";
import { baseSetBaseClass, setBaseClass } from "../utils/setBaseClass.js";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

const baseClass = setBaseClass("button");

const variants = {
  fullWidth: `${baseClass}--full-width`,
  iconOnly: `${baseClass}--icon-only`,
};

const Button = ({ variant, ...rest }: ButtonProps = {}) =>
  createElement("button", {
    ...rest,
    className: `${baseClass} ${variants[variant] ? variants[variant] : ""} ${
      rest.className
    }`,
  });

export default Button;
