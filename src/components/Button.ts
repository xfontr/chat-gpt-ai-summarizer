import { openLink } from "../services/chrome";
import HTMLAttributes from "../types/HTMLAttributes";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  href?: string;
}

const baseClass = setBaseClass("button");

const variants = {
  fullWidth: `${baseClass}--full-width`,
  iconOnly: `${baseClass}--icon-only`,
  textOnly: `${baseClass}--text-only`,
};

const Button = ({ variant, href, ...rest }: ButtonProps = {}) =>
  !href
    ? createElement<HTMLButtonElement>("button", {
        type: "button",
        ...rest,
        className: `${baseClass} ${(variant && variants[variant]) ?? ""} ${
          rest.className
        }`,
      })
    : createElement<HTMLLinkElement>("a", {
        ...rest,
        className: `${baseClass} ${(variant && variants[variant]) ?? ""} ${
          rest.className
        }`,
        href,
        onclick: openLink,
      });

export default Button;
