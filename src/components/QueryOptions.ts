import ChangeEvent from "../types/ChangeEvent.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { $ } from "../utils/querySelector.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import FormField from "./FormField.js";
import { SUMMARY_MIN_LENGTH } from "../configs/constants.js";
import { QueryMaxLengthCount } from "../types/Query.js";

type QueryOptionsProps = {
  handleForm: Function;
};

const baseClass = setBaseClass("query-options");

const QueryOptions = ({ handleForm }: QueryOptionsProps): HTMLElement => {
  const initialValues = handleForm();

  const handleLengthCountChange = (count: QueryMaxLengthCount) => () => {
    handleForm("maxLengthCount", count);

    $<HTMLInputElement>(
      `.${baseClass}__max-words`
    ).value = `${SUMMARY_MIN_LENGTH[count]}`;

    handleForm("responseMaxLength", SUMMARY_MIN_LENGTH[count]);
  };

  const queryOptions = createElement("form", {
    className: baseClass,
    onsubmit: (event) => event.preventDefault(),
  });

  const maxLengthField = createElement("div", {
    className: `${baseClass}__max-length`,
  });

  const maxQueryLength = FormField({
    label: "Summary max length",
    inputProps: {
      type: "number",
      className: `${baseClass}__max-words`,
      defaultValue: initialValues["responseMaxLength"],
      onchange: (event: ChangeEvent) => {
        handleForm("responseMaxLength", event.currentTarget.value);
      },
    },
  });

  const maxLengthFieldRadio = createElement("div", {
    className: `${baseClass}__radio-area ${baseClass}__radio-area--max-length`,
  });

  const maxLengthInWords = FormField({
    label: "Words",
    inputProps: {
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: initialValues.maxLengthCount === "words",
      onchange: handleLengthCountChange("words"),
    },
    variant: "radio",
  });

  const maxLengthInChars = FormField({
    label: "Characters",
    inputProps: {
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: initialValues.maxLengthCount === "characters",
      onchange: handleLengthCountChange("characters"),
    },
    variant: "radio",
  });

  const formatField = createElement("div", {
    className: `${baseClass}__radio-area`,
  });

  const listSummary = FormField({
    label: "In bullet points",
    inputProps: {
      type: "radio",
      name: "responseFormat",
      defaultChecked: initialValues.responseFormat === "bulletPoints",
      onchange: () => {
        handleForm("responseFormat", "bulletPoints");
      },
    },
    variant: "radio",
  });

  const regularSummary = FormField({
    label: "Normal",
    inputProps: {
      type: "radio",
      name: "responseFormat",
      defaultChecked: initialValues.responseFormat === "summary",
      onchange: () => {
        handleForm("responseFormat", "summary");
      },
    },
    variant: "radio",
  });

  appendChildren(maxLengthFieldRadio, maxLengthInWords, maxLengthInChars);
  appendChildren(maxLengthField, maxQueryLength, maxLengthFieldRadio);
  appendChildren(formatField, regularSummary, listSummary);

  return appendChildren(queryOptions, maxLengthField, formatField);
};

export default QueryOptions;
