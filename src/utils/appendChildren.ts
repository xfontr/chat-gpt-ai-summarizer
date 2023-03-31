const appendChildren = (
  parent?: HTMLElement,
  ...children: HTMLElement[]
): HTMLElement => {
  if (!children.length) return parent;

  if (parent) children.forEach((child) => child && parent.appendChild(child));

  return parent;
};

export default appendChildren;
