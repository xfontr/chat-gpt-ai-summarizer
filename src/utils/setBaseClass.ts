import { CLASS_PREFIX } from "../configs/constants";

export const baseSetBaseClass = (baseClass: string) => (className: string) =>
  `${baseClass}-${className}`;

export const setBaseClass = baseSetBaseClass(CLASS_PREFIX);
