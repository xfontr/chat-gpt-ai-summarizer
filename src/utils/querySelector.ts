export const $ = <T extends HTMLElement>(selector: string): T =>
  document.querySelector(selector) as T;

export const $$ = (...selectors: string[]) => {
  const nodes = selectors.map((selector) =>
    document.querySelectorAll(selector)
  );

  return nodes.length === 1 ? nodes[0] : nodes;
};
