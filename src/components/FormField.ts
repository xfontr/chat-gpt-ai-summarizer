import HTMLAttributes from "../types/HTMLAttributes";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  inputProps: HTMLAttributes<HTMLInputElement>;
  variant?: keyof typeof variants;
}

const baseClass = setBaseClass("form-field");

const variants = {
  radio: `${baseClass}__label--radio`,
  fullWidth: `${baseClass}--full-width`,
  fitContent: `${baseClass}--fit-content`
};

const FormField = ({
  label,
  inputProps,
  variant
}: FormFieldProps): HTMLElement => {
  const field = createElement("div", {
    className: `${baseClass} ${(variant && variants[variant]) ?? ""}`
  });

  const inputLabel = createElement("label", {
    className: `${baseClass}__label ${(variant && variants[variant]) ?? ""}`,
    textContent: label
  });

  const input = createElement("input", {
    ...inputProps,
    className: `${baseClass}__input ${inputProps.className ?? ""}`
  });

  appendChildren(inputLabel, input);

  return appendChildren(field, inputLabel);
};

export default FormField;
