import useApp from "../hooks/useApp.js";

const parseDOMText = (onlySelection: boolean): string => {
  const { unmount, mount } = useApp();

  unmount();

  const content =
    (onlySelection
      ? window.getSelection()?.toString()
      : document?.body?.innerText) || "";

  mount({ fromLastBackup: true });

  return content.replaceAll(/\s/g, " ");
};

export default parseDOMText;
