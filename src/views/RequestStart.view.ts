import Button from "../components/Button.js";
import QueryOptions from "../components/QueryOptions.js";
import StackOptions from "../components/StackOptions.js";
import useAssistant from "../hooks/useAssistant.js";
import { useQuery } from "../stores/query.store.js";
import Query, { QueryMaxLengthCount, ResponseFormat } from "../types/Query.js";
import appendChildren from "../utils/appendChildren.js";
import createElement from "../utils/createElement.js";
import { setBaseClass } from "../utils/setBaseClass.js";

const baseClass = setBaseClass("request-start ai-layout");

let formValues: Record<string, string | number> = {};
const focusOn: string[] = [];

const handleForm = (key: string, value: string) => {
  formValues[key] = value;
  return formValues;
};

const setForm = (values: Record<string, string | number>) =>
  (formValues = values);

const RequestStartView = (): HTMLElement => {
  const { executeQuery } = useAssistant();
  const { getQueryRules } = useQuery();

  setForm({
    maxLengthCount: getQueryRules().maxLengthCount,
    responseMaxLength: getQueryRules().responseMaxLength,
    responseFormat: getQueryRules().responseFormat,
  });

  const view = createElement("div", { className: baseClass });

  const queryRules = (): Partial<Query["queryRules"]> => ({
    maxLengthCount: formValues.maxLengthCount as QueryMaxLengthCount,
    responseMaxLength: +formValues.responseMaxLength || undefined,
    focusOn,
    responseFormat: formValues.responseFormat as ResponseFormat,
  });

  return appendChildren(
    view,
    QueryOptions({ handleForm }),
    StackOptions({ stack: focusOn }),
    Button({
      textContent: "Summarize",
      onclick: () => executeQuery(queryRules()),
      variant: "fullWidth",
    })
  );
};

export default RequestStartView;
