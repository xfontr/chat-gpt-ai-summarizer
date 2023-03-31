export const $ = (...selectors: string[]) => {
  const nodes = selectors.map((selector) => document.querySelector(selector));

  return nodes.length === 1 ? nodes[0] : nodes;
};

export const $$ = (...selectors: string[]) => {
  const nodes = selectors.map((selector) =>
    document.querySelectorAll(selector)
  );

  return nodes.length === 1 ? nodes[0] : nodes;
};
