import ChangeEvent from "../types/ChangeEvent";

export const limitInputLength =
  (maxLength: number) =>
  (event: Event | ChangeEvent): void => {
    if ((event as ChangeEvent).currentTarget.value.length > maxLength)
      (event as ChangeEvent).currentTarget.value = (
        event as ChangeEvent
      ).currentTarget.value.slice(0, maxLength);
  };

export const restrictLetters = (event: Event | ChangeEvent) => {
  const numbers = /^[0-9]/;

  const isLastCharNumber = (event as ChangeEvent).currentTarget.value
    .slice(-1)
    .match(numbers);

  if (!isLastCharNumber) {
    (event as ChangeEvent).currentTarget.value = (
      event as ChangeEvent
    ).currentTarget.value.slice(
      0,
      (event as ChangeEvent).currentTarget.value.length - 1
    );
  }
};
