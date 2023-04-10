import { useQuery } from "../stores/query.store";
import ChangeEvent from "../types/ChangeEvent";
import { ResponseFormat } from "../types/Query";
import appendChildren from "../utils/appendChildren";
import createElement from "../utils/createElement";
import { $ } from "../utils/querySelector";
import { setBaseClass } from "../utils/setBaseClass";
import FormField from "./FormField";

const baseClass = setBaseClass("query-format");

const QueryFormatOptions = () => {
  const { setResponseFormat, getQueryRules } = useQuery();

  const formatField = createElement("div", {
    className: `${baseClass}__radio-area`,
  });

  const listSummary = FormField({
    label: "",
    className: `${baseClass}__form`,
    addChildren: [
      createElement("span", {
        textContent: "Bullets",
        className: `${baseClass}__label`,
      }),
    ],
    inputProps: {
      type: "radio",
      name: "responseFormat",
      value: "bulletPoints",
      defaultChecked: getQueryRules().responseFormat === "bulletPoints",
      className: `${baseClass}__radio-button`,
      onchange: (event: Event) => {
        setResponseFormat(
          (event as ChangeEvent).currentTarget.value as ResponseFormat
        );
        $(".ai-query-options").style.opacity = "0.65";
        $(".ai-query-options__max-words").setAttribute("disabled", "true");
      },
    },
    variant: "radio",
  });

  const regularSummary = FormField({
    label: "",
    className: `${baseClass}__form`,
    addChildren: [
      createElement("span", {
        textContent: "Normal",
        className: `${baseClass}__label`,
      }),
    ],
    inputProps: {
      type: "radio",
      name: "responseFormat",
      value: "summary",
      defaultChecked: getQueryRules().responseFormat === "summary",
      className: `${baseClass}__radio-button`,
      onchange: (event: Event) => {
        setResponseFormat(
          (event as ChangeEvent).currentTarget.value as ResponseFormat
        );
        $(".ai-query-options").style.opacity = "1";
        $(".ai-query-options__max-words").removeAttribute("disabled");
      },
    },
    variant: "radio",
  });

  return appendChildren(formatField, regularSummary, listSummary);
};

export default QueryFormatOptions;
