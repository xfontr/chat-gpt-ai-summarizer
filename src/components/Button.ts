import HTMLAttributes from "../types/HTMLAttributes";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const baseClass = setBaseClass("button");

const Button = (props: ButtonProps = {}) =>
  createElement("button", { className: baseClass, ...props });

export default Button;
