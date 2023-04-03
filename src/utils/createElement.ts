import HTMLAttributes from "../types/HTMLAttributes";

const createElement = <T extends HTMLElement>(
  name: keyof HTMLElementTagNameMap,
  props: HTMLAttributes<T> = {}
): HTMLElement => {
  const newElement = document.createElement(name);

  Object.keys(props).forEach(key => {
    /** Disgusting workaround for the read-only props, so this is a potential bug house */
    (newElement[key as keyof HTMLAttributes] as any) = props[
      key as keyof HTMLAttributes
    ];
  });

  return newElement;
};

export default createElement;
