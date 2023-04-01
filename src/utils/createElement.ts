import HTMLAttributes from "../types/HTMLAttributes";

const createElement = <T extends HTMLElement>(
  name: keyof HTMLElementTagNameMap,
  props: HTMLAttributes<T> = {}
): HTMLElement => {
  const newElement = document.createElement(name);

  Object.keys(props).forEach((key: keyof HTMLAttributes) => {
    /** Disgusting workaround for the read-only props, so this is a potential bug house */
    (newElement[key] as any) = props[key];
  });

  return newElement;
};

export default createElement;
