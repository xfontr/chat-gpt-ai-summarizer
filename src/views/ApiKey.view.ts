import Button from "../components/Button";
import FormField from "../components/FormField";
import Instructions from "../components/Instructions";
import Layout from "../components/Layout";
import useApp from "../hooks/useApp";
import { useApiKey } from "../stores/apiKey.store";
import ChangeEvent from "../types/ChangeEvent";
import appendChildren from "../utils/appendChildren";
import createElement from "../utils/createElement";
import { replaceNode, updateNode } from "../utils/renderUtils";
import { setBaseClass } from "../utils/setBaseClass";
import RequestStartView from "./RequestStart.view";

let inputValue = "";

const baseClass = setBaseClass("api-key");

const ApiKeyView = (): HTMLElement => {
  const { setApiKey, getApiKey, deleteApiKey } = useApiKey();
  const { getApp } = useApp();

  const view = createElement("div", {
    className: baseClass,
  });

  const currentApiKeyMessage = () =>
    getApiKey()
      ? `Key valid - Key Current api key: ...${getApiKey()?.slice(-4)}`
      : "Key invalid - You haven't set your api key yet";

  const currentApiKey = createElement("span", {
    textContent: currentApiKeyMessage(),
  });

  const preInfo = createElement("p", {
    textContent: "Getting your API Key is free and easy!",
    className: `${baseClass}__intro`,
  });

  const instructions = Instructions({
    instructions: [
      appendChildren(
        createElement("span", {
          textContent: "Go to your openai account API keys: ",
        }),
        Button({
          textContent: "Link to API Keys",
          href: "https://platform.openai.com/account/api-keys",
        })
      ),
      "Create an API key, copy it and paste it below. Submit and that's it!",
    ],
  });

  const extraInfo = createElement("p", {
    textContent:
      "We will NOT have access to the API key (the code is open source, check it yourself!).",
    className: `${baseClass}__outro`,
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const response = await setApiKey(inputValue);

    currentApiKey.textContent = currentApiKeyMessage();

    setTimeout(() => {
      response &&
        replaceNode(getApp(), Layout({ addChildren: RequestStartView() }));
    }, 1100);
  };

  const form = createElement("form", {
    onsubmit: handleSubmit,
    className: `${baseClass}__form`,
  });

  const handleChange = (event: Event) => {
    inputValue = (event as ChangeEvent).currentTarget.value;
  };

  const setApiKeyField = FormField({
    label: "Your api key",
    inputProps: { type: "text", onchange: handleChange },
    variant: "fullWidth",
  });

  const submitButton = Button({
    textContent: "Set api key",
    type: "submit",
  });

  const deleteApiKeyButton = Button({
    textContent: "Delete my key",
    onclick: async () => {
      await deleteApiKey();
      currentApiKey.textContent = currentApiKeyMessage();
    },
    className: "button--contrast",
    variant: "textOnly",
  });

  const goBack = createElement("button", {
    textContent: "Cancel",
    className: `${baseClass}__cancel`,
    onclick: () =>
      updateNode(getApp(), Layout({ addChildren: RequestStartView() })),
  });

  return appendChildren(
    view,
    preInfo,
    instructions,
    appendChildren(
      form,
      setApiKeyField,
      currentApiKey,
      submitButton,
      deleteApiKeyButton
    ),
    extraInfo,
    goBack
  );
};

export default ApiKeyView;
