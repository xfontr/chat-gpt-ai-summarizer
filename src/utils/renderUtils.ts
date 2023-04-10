import appendChildren from "./appendChildren.js";

export const clearNode = (node: HTMLElement) => {
  const newNode = node;
  newNode.innerHTML = "";
  return newNode;
};

export const updateNode = (node: HTMLElement, update: HTMLElement) =>
  appendChildren(clearNode(node), update);

export const replaceNode = (baseNode: HTMLElement, node: HTMLElement) => {
  baseNode.replaceWith(node);
};
