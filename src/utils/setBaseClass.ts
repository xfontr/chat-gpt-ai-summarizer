import { CLASS_PREFIX } from "../configs/constants.js";

export const baseSetBaseClass =
  <T extends string>(baseClass: T) =>
  (
    className: string,
    withSelector?: boolean
  ): `${typeof baseClass}-${string}` | `.${typeof baseClass}-${string}` =>
    `${withSelector ? "." : ""}${baseClass}-${className}`;

export const setBaseClass = baseSetBaseClass(CLASS_PREFIX);
