const captureEvent =
  (eventName: keyof HTMLElementEventMap) => (event: Event) => {
    event.stopPropagation();
    window.removeEventListener(eventName, captureEvent(eventName), true);
  };

export default captureEvent;
