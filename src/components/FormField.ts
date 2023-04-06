import HTMLAttributes from "../types/HTMLAttributes";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  inputProps: HTMLAttributes<HTMLInputElement>;
  variant?: keyof typeof variants;
  addChildren?: HTMLElement[];
}

const baseClass = setBaseClass("form-field");

const variants = {
  radio: `${baseClass}__label--radio`,
  fullWidth: `${baseClass}--full-width`,
  fitContent: `${baseClass}--fit-content`,
  noStyle: `${baseClass}--no-style`
};

const FormField = ({
  label,
  inputProps,
  variant,
  addChildren = [],
  ...rest
}: FormFieldProps): HTMLElement => {
  const field = createElement("div", {
    className: `${baseClass} ${rest.className ?? ""} ${(variant &&
      variants[variant]) ??
      ""}`
  });

  const inputLabel = createElement<HTMLLabelElement>("label", {
    className: `${baseClass}__label ${(variant && variants[variant]) ?? ""}`,
    textContent: label
  });

  const input = createElement("input", {
    ...inputProps,
    className: `${baseClass}__input ${(variant && variants[variant]) ??
      ""} ${inputProps.className ?? ""}`
  });

  appendChildren(inputLabel, input, ...addChildren);

  return appendChildren(field, inputLabel);
};

export default FormField;
