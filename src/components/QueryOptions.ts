import ChangeEvent from "../types/ChangeEvent.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { $ } from "../utils/querySelector.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import FormField from "./FormField.js";
import { SUMMARY_MIN_LENGTH } from "../configs/constants.js";
import { QueryMaxLengthCount, ResponseFormat } from "../types/Query.js";
import { useQuery } from "../stores/query.store.js";

const baseClass = setBaseClass("query-options");

const QueryOptions = (): HTMLElement => {
  const {
    getQueryRules,
    setResponseMaxLength,
    setMaxLengthCount,
    setResponseFormat
  } = useQuery();

  const handleLengthCountChange = (count: QueryMaxLengthCount) => () => {
    $<HTMLInputElement>(
      `.${baseClass}__max-words`
    ).value = `${SUMMARY_MIN_LENGTH[count]}`;

    setMaxLengthCount(count);
  };

  const queryOptions = createElement("form", {
    className: baseClass,
    onsubmit: event => event.preventDefault()
  });

  const maxLengthField = createElement("div", {
    className: `${baseClass}__max-length`
  });

  const maxQueryLength = FormField({
    label: "Summary max length",
    inputProps: {
      type: "number",
      className: `${baseClass}__max-words`,
      defaultValue: getQueryRules().responseMaxLength.toString(),
      onchange: (event: Event) => {
        setResponseMaxLength(+(event as ChangeEvent).currentTarget.value);
      }
    },
    variant: "fullWidth"
  });

  const maxLengthFieldRadio = createElement("div", {
    className: `${baseClass}__radio-area ${baseClass}__radio-area--max-length`
  });

  const maxLengthInWords = FormField({
    label: "Words",
    inputProps: {
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: getQueryRules().maxLengthCount === "words",
      onchange: () => handleLengthCountChange("words")
    },
    variant: "radio"
  });

  const maxLengthInChars = FormField({
    label: "Characters",
    inputProps: {
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: getQueryRules().maxLengthCount === "characters",
      onchange: handleLengthCountChange("characters")
    },
    variant: "radio"
  });

  const formatField = createElement("div", {
    className: `${baseClass}__radio-area`
  });

  const listSummary = FormField({
    label: "In bullet points",
    inputProps: {
      type: "radio",
      name: "responseFormat",
      value: "bulletPoints",
      defaultChecked: getQueryRules().responseFormat === "bulletPoints",
      onchange: (event: Event) => {
        setResponseFormat(
          (event as ChangeEvent).currentTarget.value as ResponseFormat
        );
      }
    },
    variant: "radio"
  });

  const regularSummary = FormField({
    label: "Normal",
    inputProps: {
      type: "radio",
      name: "responseFormat",
      value: "summary",
      defaultChecked: getQueryRules().responseFormat === "summary",
      onchange: (event: Event) => {
        setResponseFormat(
          (event as ChangeEvent).currentTarget.value as ResponseFormat
        );
      }
    },
    variant: "radio"
  });

  appendChildren(maxLengthFieldRadio, maxLengthInWords, maxLengthInChars);
  appendChildren(maxLengthField, maxQueryLength, maxLengthFieldRadio);
  appendChildren(formatField, regularSummary, listSummary);

  return appendChildren(queryOptions, maxLengthField, formatField);
};

export default QueryOptions;
