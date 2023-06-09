import ChangeEvent from "../types/ChangeEvent.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { $ } from "../utils/querySelector.js";
import { setBaseClass } from "../utils/setBaseClass.js";
import FormField from "./FormField.js";
import { SUMMARY_MIN_LENGTH } from "../configs/constants.js";
import { QueryMaxLengthCount } from "../types/Query.js";
import { useQuery } from "../stores/query.store.js";
import { limitInputLength, restrictLetters } from "../utils/form.utils.js";
import { query } from "../views/RequestStart.view.js";

type QueryOptionsProps<T = unknown> = {
  handler?: (...args: any[]) => T;
};

const maxLengthFieldMaxLength = {
  words: 3,
  characters: 4,
};

const baseClass = setBaseClass("query-options");

const QueryOptions = <T = unknown>({
  handler,
}: QueryOptionsProps<T>): HTMLElement => {
  const { getQueryRules, setResponseMaxLength, setMaxLengthCount } = useQuery();

  const callHandler = (...args: any[]): T | undefined =>
    handler && handler(...args);

  const handleLengthCountChange = (count: QueryMaxLengthCount) => () => {
    $<HTMLInputElement>(`.${baseClass}__max-words`).value =
      SUMMARY_MIN_LENGTH[count].toString();

    setMaxLengthCount(count);
    setResponseMaxLength(SUMMARY_MIN_LENGTH[count]);

    query().then((res) => callHandler(res));
  };

  const queryOptions = createElement("form", {
    className: baseClass,
    onsubmit: (event) => event.preventDefault(),
  });

  const maxQueryLength = FormField({
    label: "",
    inputProps: {
      type: "number",
      className: `${baseClass}__max-words`,
      defaultValue: getQueryRules().responseMaxLength.toString(),
      onchange: (event: Event) => {
        setResponseMaxLength(+(event as ChangeEvent).currentTarget.value);
        query().then((res) => callHandler(res));
      },
      oninput: (event) => {
        limitInputLength(
          maxLengthFieldMaxLength[getQueryRules().maxLengthCount]
        )(event);
        restrictLetters(event);
      },
    },
    variant: "noStyle",
  });

  const maxLengthInWords = FormField({
    label: "",
    addChildren: [
      createElement("span", {
        textContent: "Words",
        className: `${baseClass}__label`,
      }),
    ],
    className: `${baseClass}__form`,
    inputProps: {
      className: `${baseClass}__radio-button`,
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: getQueryRules().maxLengthCount === "words",
      onclick: handleLengthCountChange("words"),
    },
    variant: "radio",
  });

  const maxLengthInChars = FormField({
    label: "",
    addChildren: [
      createElement("span", {
        textContent: "Characters",
        className: `${baseClass}__label`,
      }),
    ],
    className: `${baseClass}__form`,
    inputProps: {
      className: `${baseClass}__radio-button`,
      type: "radio",
      name: "maxLengthCount",
      defaultChecked: getQueryRules().maxLengthCount === "characters",
      onclick: handleLengthCountChange("characters"),
    },
    variant: "radio",
  });

  return appendChildren(
    queryOptions,
    maxQueryLength,
    maxLengthInWords,
    maxLengthInChars
  );
};

export default QueryOptions;
