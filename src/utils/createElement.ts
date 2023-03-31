import HTMLAttributes from "../types/HTMLAttributes";

const createElement = (
  name: keyof HTMLElementTagNameMap,
  props: HTMLAttributes
): HTMLElement => {
  const newElement = document.createElement(name);

  Object.keys(props).forEach((key: keyof HTMLAttributes) => {
    /** Disgusting workaround for the read-only props, so this is a potential bug house */
    (newElement[key] as any) = props[key];
  });

  return newElement;
};

export default createElement;
